import { CreateBookDto } from "@app/dtos";
import { HttpService } from "@nestjs/axios";
import { firstValueFrom } from 'rxjs';
import { Injectable, Inject, BadGatewayException } from "@nestjs/common";
import { ClientKafka } from "@nestjs/microservices";

@Injectable()
export class ApiGatewayBooksService {
  constructor(
    @Inject('BOOKS_SERVICE') private readonly booksProxyClient: ClientKafka,
    private readonly httpService: HttpService,
  ) {}

  private getBooksBaseUrl(): string {
    const port = process.env.BOOKS_PORT || '3020';
    return process.env.BOOKS_URL || `http://localhost:${port}`;
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
    const url = new URL(path, this.getBooksBaseUrl()).toString();
    const headers = this.forwardHeaders(req);

    console.log(`[GATEWAY] Forwarding GET ${url}`);

    try {
      const { data } = await firstValueFrom(
        this.httpService.get(url, { headers }),
      );
      return { source: 'gateway', data };
    } catch (err) {
      console.error(`Books service is unavailable:`, err.message);
      throw new BadGatewayException('Books service is unavailable');
    }
  }

  // Proxy POST calls
  async proxyPost(path: string, body: any, req: any) {
    const url = new URL(path, this.getBooksBaseUrl()).toString();
    const headers = this.forwardHeaders(req);

    console.log(`[GATEWAY] Forwarding request to ${url}`);

    try {
      const { data } = await firstValueFrom(
        this.httpService.post(url, body, { headers }),
      );
      return { source: 'gateway', data };
    } catch (err) {
      console.error(`Books service is unavailable:`, err.message);
      throw new BadGatewayException('Books service is unavailable');
    }
  }

  // Proxy PUT calls
  async proxyPut(path: string, body: any, req: any) {
    const url = new URL(path, this.getBooksBaseUrl()).toString();
    const headers = this.forwardHeaders(req);

    console.log(`[GATEWAY] Forwarding PUT ${url}`);

    try {
      const { data } = await firstValueFrom(
        this.httpService.put(url, body, { headers }),
      );
      return { source: 'gateway', data };
    } catch (err) {
      console.error(`Books service is unavailable:`, err.message);
      throw new BadGatewayException('Books service is unavailable');
    }
  }

  // Proxy DELETE calls
  async proxyDelete(path: string, req: any) {
    const url = new URL(path, this.getBooksBaseUrl()).toString();
    const headers = this.forwardHeaders(req);

    console.log(`[GATEWAY] Forwarding DELETE ${url}`);

    try {
      const { data } = await firstValueFrom(
        this.httpService.delete(url, { headers }),
      );
      return { source: 'gateway', data };
    } catch (err) {
      console.error(`Books service is unavailable:`, err.message);
      throw new BadGatewayException('Books service is unavailable');
    }
  }

  // Kafka events
  createBookEvent(payload: CreateBookDto) {
    try {
      this.booksProxyClient.emit('book_created', payload);
      return { status: 'Book event published', payload };
    } catch {
      throw new BadGatewayException('Failed to publish book_created event');
    }
  }

  updateBookEvent(id: number, payload: any) {
    try {
      this.booksProxyClient.emit('book_updated', { id, ...payload });
      return { status: 'Book event published', id, payload };
    } catch {
      throw new BadGatewayException('Failed to publish book_updated event');
    }
  }

  deleteBookEvent(id: number) {
    try {
      this.booksProxyClient.emit('book_deleted', { id });
      return { status: 'Book event published', id };
    } catch {
      throw new BadGatewayException('Failed to publish book_deleted event');
    }
  }
}