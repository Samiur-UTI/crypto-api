import { Module } from '@nestjs/common';
import { PortfolioController } from './portfolio.controller';
import { PortfolioService } from './portfolio.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transactions } from 'src/entities/transaction.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Transactions])],
  providers: [PortfolioService],
  controllers: [PortfolioController],
})
export class ReadModule {}
