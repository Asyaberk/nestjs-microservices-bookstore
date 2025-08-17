import { Injectable, OnApplicationShutdown } from "@nestjs/common";

@Injectable()
export class KafkaConsumerService implements OnApplicationShutdown {
    constructor() { }

    
    onApplicationShutdown() { }
}