import { Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HealthCheckController } from './health-check/health-check.controller';
import { RequestLoggerMiddleware } from './request-logger/request-logger.middleware';

@Module({
  imports: [],
  controllers: [AppController, HealthCheckController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer) {
    consumer.apply(RequestLoggerMiddleware).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });
  }
}
