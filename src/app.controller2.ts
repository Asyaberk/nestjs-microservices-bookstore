import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { CacheInterceptor, CacheKey, CacheTTL } from '@nestjs/cache-manager';

//class for demonstration purposes(individual caching)

//indivual cache for this class
//@UseInterceptors(CacheInterceptor) 
@Controller('ctrl2')
export class AppController2 { 
  constructor(private readonly appService: AppService) {}

  //indivudual cachekey
  @CacheKey('whatever2')
  @Get()
  manualCaching() {
    return this.appService.manualCaching();
  }

  //or indivual cache only for this method
  //@UseInterceptors(CacheInterceptor)
  //we can also override global caching
  //@CacheTTL(60_000)
  @Get('/foo')
  getData2() {
    return this.appService.getData2();
  }
}
