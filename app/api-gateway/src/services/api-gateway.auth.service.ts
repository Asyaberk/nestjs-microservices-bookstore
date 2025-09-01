import { HttpService } from "@nestjs/axios";
import { firstValueFrom } from 'rxjs';
import { Injectable, Inject, BadGatewayException } from "@nestjs/common";
import { ClientKafka } from "@nestjs/microservices";
import { CreateUserDto, LoginUserDto } from "@app/dtos";

@Injectable()
export class ApiGatewayAuthService {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authProxyClient: ClientKafka,
    private readonly httpService: HttpService,
  ) {}

  private getAuthBaseUrl(): string {
    const port = process.env.AUTH_PORT || '3060';
    return process.env.AUTH_URL || `http://localhost:${port}`;
  }

  private forwardHeaders(req: any) {
    const headers: Record<string, string> = {};
    const auth = req.headers['authorization'];
    const cookie = req.headers['cookie'];
    if (auth) headers['Authorization'] = auth;
    if (cookie) headers['Cookie'] = cookie;
    return headers;
  }

  // Proxy GET calls
  async proxyGet(path: string, req: any) {
    const url = new URL(path, this.getAuthBaseUrl()).toString();
    const headers = this.forwardHeaders(req);

    console.log(`[GATEWAY] Forwarding request to ${url}`);

    try {
      const { data } = await firstValueFrom(
        this.httpService.get(url, { headers }),
      );
      return { source: 'gateway', data };
    } catch (err) {
      console.error(`Auth service is unavailable:`, err.message);
      throw new BadGatewayException('Auth service is unavailable');
    }
  }

  // Proxy POST calls
  async proxyPost(path: string, body: any, req: any) {
    const url = new URL(path, this.getAuthBaseUrl()).toString();
    const headers = this.forwardHeaders(req);

    console.log(`[GATEWAY] Forwarding request to ${url}`);

    try {
      const response = await firstValueFrom(
        this.httpService.post(url, body, { headers, withCredentials: true }),
      );
      return {
        source: 'gateway',
        data: response.data,
        cookies: response.headers['set-cookie'],
      };
    } catch (err) {
      console.error(`Auth service is unavailable:`, err.message);
      throw new BadGatewayException('Auth service is unavailable');
    }
  }

  //Kafka events
  registerUserEvent(payload: CreateUserDto) {
    try {
      this.authProxyClient.emit('user_registered', {
        email: payload.email,
        password: payload.password,
        roleId: payload.roleId,
      });
      return { status: 'Auth event published', payload };
    } catch {
      throw new BadGatewayException('Failed to publish user_registered event');
    }
  }

  loginUserEvent(payload: LoginUserDto) {
    try {
      this.authProxyClient.emit('user_logged_in', {
        email: payload.email,
        password: payload.password,
      });
      return { status: 'Auth event published', payload };
    } catch {
      throw new BadGatewayException('Failed to publish user_logged_in event');
    }
  }

  logoutUserEvent(userId: number) {
    try {
      this.authProxyClient.emit('user_logged_out', { userId });
      return { status: 'Auth event published', userId };
    } catch {
      throw new BadGatewayException('Failed to publish user_logged_out event');
    }
  }
}