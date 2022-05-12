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
import { ConversionService } from 'src/conversion/conversion.service';
import { Rate } from 'src/entities/misc.entity';
@Controller('portfolio')
export class PortfolioController {
  constructor(
    private portfolioService: PortfolioService,
    private conversionService: ConversionService,
  ) {}

  @Get('/')
  @HttpCode(HttpStatus.OK)
  async portfolio(@Req() req: Request): Promise<any> {
    const tokens = await this.portfolioService.getTokens();
    const portfolio = await Promise.all(
      tokens.map(async (token: string) => {
        const tokenPortfolio = await this.portfolioService.getTokenPortfolio(
          token,
        );
        const rate = await this.conversionService.getConversionRate(
          token,
          'USD',
        );
        return {
          token: tokenPortfolio.token,
          portfolio: tokenPortfolio.portfolio * rate.USD,
          currency: 'USD',
        };
      }),
    );
    return portfolio;
  }
  @Get('/token/:token')
  @HttpCode(HttpStatus.OK)
  async tokenPortfolio(@Param('token') token: string): Promise<any> {
    console.log('TOKEN IS: ', token);
    const tokenPortfolio = await this.portfolioService.getTokenPortfolio(token);
    const rate = await this.conversionService.getConversionRate(token, 'USD');
    return {
      token: tokenPortfolio.token,
      portfolio: tokenPortfolio.portfolio * rate.USD,
      currency: 'USD',
    };
  }
  @Get('/date/:date')
  @HttpCode(HttpStatus.OK)
  async datePortfolio(@Param('date') date: string): Promise<any> {
    console.log('DATE IS: ', date);
    const tokens = await this.portfolioService.getTokens();
    const portfolioByDate = await Promise.all(
      tokens.map(async (token: string) => {
        const tokenPortfolio = await this.portfolioService.getDatePortfolio(
          date,
          token,
        );
        const rate = await this.conversionService.getConversionRate(
          token,
          'USD',
        );
        return {
          token: tokenPortfolio.token,
          portfolio: tokenPortfolio.portfolio * rate.USD,
          currency: 'USD',
        };
      }),
    );
    return portfolioByDate;
  }
  @Get('/date/:date/token/:token')
  @HttpCode(HttpStatus.OK)
  async dateTokenPortfolio(
    @Param('date') date: string,
    @Param('token') token: string,
  ): Promise<any> {
    console.log('DATE IS: ', date);
    console.log('TOKEN IS: ', token);
    const tokenPortfolio = await this.portfolioService.getDatePortfolio(
      date,
      token,
    );
    const rate = await this.conversionService.getConversionRate(token, 'USD');
    return {
      token: tokenPortfolio.token,
      portfolio: tokenPortfolio.portfolio * rate.USD,
      currency: 'USD',
    };
  }
}
