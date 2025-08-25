import { BadGatewayException, Inject, Injectable } from "@nestjs/common";
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { ClientKafka } from "@nestjs/microservices";
import { CreateRoleDto } from "@app/dtos";


@Injectable()
export class ApiGatewayRolesService {
    constructor(
        @Inject('ROLES_SERVICE') private readonly rolesProxyClient: ClientKafka,
        private readonly httpService: HttpService
    ) { }
    
    private getRolesBaseUrl(): string {
        const port = process.env.ROLES_PORT || '3050';
        return process.env.ROLES_URL || `http://localhost:${port}`;
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
        const url = new URL(path, this.getRolesBaseUrl()).toString();
        const headers = this.forwardHeaders(req);

        console.log(`[GATEWAY] Forwarding request to ${url}`);

        try {
            const { data } = await firstValueFrom(
                this.httpService.get(url, { headers }),
            );
            return { source: 'gateway', data };
        } catch (err) {
            console.log(`Roles service is unavailable: ${err}`);
        }
    }

    // Proxy POST calls
      async proxyPost(path: string, body: any, req: any) {
        const url = new URL(path, this.getRolesBaseUrl()).toString();
        const headers = this.forwardHeaders(req);
    
        console.log(`[GATEWAY] Forwarding request to ${url}`);
    
        try {
          const { data } = await firstValueFrom(
            this.httpService.post(url, body, { headers }),
          );
          return { source: 'gateway', data };
        } catch (err) {
          console.log(`Roles service is unavailable: ${err}`);
        }
      }
    
      // Kafka events
      createRentalEvent(payload: CreateRoleDto ) {
        try {
          this.rolesProxyClient.emit('role_created', { name: payload.name });
          return { status: 'Roles event published', payload };
        } catch {
          throw new BadGatewayException('Failed to publish rental event');
        }
      }
}