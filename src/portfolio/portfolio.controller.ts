import {
  Controller,
  Req,
  Get,
  Query,
  Param,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { PortfolioService } from './portfolio.service';
import { Request } from 'express';

@Controller()
export class PortfolioController {
  constructor(private portfolioService: PortfolioService) {}

  @Get('/portfolio')
  @HttpCode(HttpStatus.OK)
  async read(@Req() req: Request): Promise<any> {
    return await this.portfolioService.get();
  }
}
