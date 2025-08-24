import { Injectable, Inject } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { ClientKafka } from '@nestjs/microservices';
import { CreateRentalDto } from '@app/dtos';

@Injectable()
export class ApiGatewayLibraryService {
  constructor(
    @Inject('LIBRARY_SERVICE') private readonly libraryProxyClient: ClientKafka,
    private readonly httpService: HttpService,
  ) {}

  private getLibraryBaseUrl(): string {
    const port = process.env.LIBRARY_PORT || '3030';
    return process.env.LIBRARY_URL || `http://localhost:${port}`;
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
    // library service URL and token forward
    const url = new URL(path, this.getLibraryBaseUrl()).toString();
    const headers = this.forwardHeaders(req);

    console.log(`[GATEWAY] Forwarding request to ${url}`); 

    const { data } = await firstValueFrom(
      this.httpService.get(url, { headers }),
    );
    return {
      source: 'gateway',
      data,
    };
  }

  // Proxy POST calls
  async proxyPost(path: string, body: any, req: any) {
    const url = new URL(path, this.getLibraryBaseUrl()).toString();
    const headers = this.forwardHeaders(req);

    console.log(`[GATEWAY] Forwarding request to ${url}`); 

    const { data } = await firstValueFrom(
      this.httpService.post(url, body, { headers }),
    );
    return {
      source: 'gateway',
      data,
    };
  }

  // Kafka events
  createRentalEvent(payload: CreateRentalDto & { userId?: number }) {
    this.libraryProxyClient.emit('rental_created', {
      bookId: payload.bookId,
      userId: payload.userId,
    });
    return { status: 'Rental event published', payload };
  }

  returnRentalEvent(bookId: number) {
    this.libraryProxyClient.emit('rental_returned', { bookId });
    return { status: 'Return event published', bookId };
  }
}
