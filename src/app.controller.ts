import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  manualCaching() {
    return this.appService.manualCaching();
  }

  @Get('/foo')
  getData2() {
    return this.appService.getData2();
  }
}
