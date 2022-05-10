import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import * as es from 'event-stream';
import { InjectRepository } from '@nestjs/typeorm';
import { Transactions } from '../entities/transaction.entity';
import { ParsingService } from '../utils/parsing';
import {
  Repository,
  LessThan,
  MoreThan,
  Connection,
  Not,
  Equal,
  Brackets,
} from 'typeorm';
const dirPathRead = path.join(__dirname, '../../src/assets/transactions.csv');
// const dirPathWrite = path.join(__dirname, '../../src/assets/transactions.json');

@Injectable()
export class ReadService {
  constructor(
    @InjectRepository(Transactions)
    private transactionsRepository: Repository<Transactions>,
    private connection: Connection,
    private parsingService: ParsingService,
  ) {}
  async read(): Promise<string> {
    const serverTime = await Promise.race([
      this.transactionsRepository.find(),
      setTimeout(() => {
        return 'Data already in DB';
      }, 15000),
    ]);
    const connection = this.connection;
    if (typeof serverTime !== 'string') {
      const readStream = fs.createReadStream(dirPathRead);
      try {
        readStream
          .on('data', async (data: any) => {
            const chunk = this.parsingService.parse(data);
            // const response = await connection
            //   .getRepository(Transactions)
            //   .createQueryBuilder('transactions')
            //   .insert()
            //   .into('transactions')
            //   .values(chunk)
            //   .execute();
            // console.log(response);
          })
          .on('end', async () => {
            console.log('end');
          })
          .on('error', async (err: any) => {
            console.log(err);
          });
      } catch (error) {
        console.log(error);
      }
      return 'Data inserted';
    } else {
      return serverTime;
    }
  }
}
