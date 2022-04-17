import {
  Controller,
  Req,
  Get,
  Query,
  Param,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ReadService } from './read.service';
import { Request } from 'express';

@Controller()
export class ReadController {
  constructor(private readService: ReadService) {}

  @Get('/read')
  @HttpCode(HttpStatus.OK)
  async read(@Req() req: Request): Promise<any> {
    return await this.readService.read();
  }
}
