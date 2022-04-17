//read module to read the data from the file
import { Module } from '@nestjs/common';
import { ReadController } from './read.controller';
import { ReadService } from './read.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transactions } from 'src/entities/transaction.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Transactions])],
  providers: [ReadService],
  controllers: [ReadController],
})
export class ReadModule {}
