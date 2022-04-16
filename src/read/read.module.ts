//read module to read the data from the file
import { Module } from '@nestjs/common';
import { ReadController } from './read.controller';
import { ReadService } from './read.service';


@Module({
  imports: [],
  providers: [ReadService],
  controllers: [ReadController],
})
export class ReadModule {}
