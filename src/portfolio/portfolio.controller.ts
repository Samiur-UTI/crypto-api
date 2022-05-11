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
@Controller()
export class PortfolioController {
  constructor(
    private portfolioService: PortfolioService,
    private conversionService: ConversionService,
  ) {}

  @Get('/portfolio')
  @HttpCode(HttpStatus.OK)
  async portfolio(@Req() req: Request): Promise<any> {
    const [btcPortfolio, ethPortfolio, xrpPortfolio] = await Promise.all([
      this.portfolioService.getBtcPortFolio(),
      this.portfolioService.getEthPortfolio(),
      this.portfolioService.getXrpPortfolio(),
    ]);
    const tokens = ['BTC', 'ETH', 'XRP'];
    const [btcRate, ethRate, xrpRate] = await Promise.all(
      tokens.map(async (token) => {
        const response = await this.conversionService.getConversionRate(
          token,
          'USD',
        );
        return response;
      }),
    );
    const BTC: number = ((btcPortfolio.btcPortfolio as number) *
      btcRate.USD) as number;
    const ETH: number = ((ethPortfolio.ethPortfolio as number) *
      ethRate.USD) as number;
    const XRP: number = ((xrpPortfolio.xrpPortfolio as number) *
      xrpRate.USD) as number;
    return {
      BTC,
      ETH,
      XRP,
    };
  }
}
