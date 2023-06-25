import { Controller, Get, HttpStatus, Res } from '@nestjs/common';
import { Response } from 'express';

@Controller('health-check')
export class HealthCheckController {
  @Get()
  index(@Res() res: Response) {
    res.status(HttpStatus.OK).send({
      message: 'Service is up and running',
    });
  }
}
