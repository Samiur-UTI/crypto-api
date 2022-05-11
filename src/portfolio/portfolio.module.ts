import { Module } from '@nestjs/common';
import { PortfolioController } from './portfolio.controller';
import { PortfolioService } from './portfolio.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transactions } from 'src/entities/transaction.entity';
import { ConversionModule } from 'src/conversion/conversion.module';
@Module({
  imports: [TypeOrmModule.forFeature([Transactions]), ConversionModule],
  providers: [PortfolioService],
  controllers: [PortfolioController],
})
export class PortfolioModule {}
