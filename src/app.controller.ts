import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from '@nestjs/passport';

@Controller()
export class AppController {
/* 
  //this was the test guard application so we can comment them to delete app/ frpm swagger
  constructor(private readonly appService: AppService) {}

  //We put guard so we can see the effect of jwtstrategy(verify then permission)
  @UseGuards(AuthGuard('jwt'))
  @Get()
  getHello(): string {
    return this.appService.getHello() ;
  } */
}
