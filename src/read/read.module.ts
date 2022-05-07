import { Module } from '@nestjs/common';
import { ReadController } from './read.controller';
import { ReadService } from './read.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transactions } from 'src/entities/transaction.entity';
import { ParsingService } from 'src/utils/parsing';
@Module({
  imports: [TypeOrmModule.forFeature([Transactions])],
  providers: [ReadService, ParsingService],
  controllers: [ReadController],
})
export class ReadModule {}
