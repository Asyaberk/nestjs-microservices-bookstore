import { BadGatewayException, Injectable } from "@nestjs/common";
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';


@Injectable()
export class ApiGatewayUsersService {
  constructor(private readonly httpService: HttpService) {}

  private getUsersBaseUrl(): string {
    const port = process.env.USERS_PORT || '3040';
    return process.env.USERS_URL || `http://localhost:${port}`;
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
    const url = new URL(path, this.getUsersBaseUrl()).toString();
    const headers = this.forwardHeaders(req);

    console.log(`[GATEWAY] Forwarding request to ${url}`);

    try {
      const { data } = await firstValueFrom(
        this.httpService.get(url, { headers }),
      );
      return { source: 'gateway', data };
    } catch (err) {
        console.error(`Users service is unavailable:`, err.message);
        throw new BadGatewayException('Users service is unavailable');
    }
  }
}