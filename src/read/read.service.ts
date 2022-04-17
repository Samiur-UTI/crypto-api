import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import * as es from 'event-stream';
import { InjectRepository } from '@nestjs/typeorm';
import { Transactions } from '../entities/transaction.entity';
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
  ) {}
  async read(): Promise<void> {
    const readStream = fs.createReadStream(dirPathRead);
    const connection = this.connection;
    readStream
      .on('data', async (data: any) => {
        const dataArray = data.toString().split('\n');
        const dataArrayLength = dataArray.length;
        const chunk = [];
        for (let i = 0; i < dataArrayLength; i++) {
          const dataArraySplit = dataArray[i].split(',');
          const dataArraySplitLength = dataArraySplit.length;
          const transaction = {};
          for (let j = 0; j < dataArraySplitLength; j++) {
            if (j === 0) {
              transaction['timestamp'] =
                dataArraySplit[j] === 'timestamp'
                  ? 0
                  : parseFloat(dataArraySplit[j]);
            } else if (j === 1) {
              transaction['transactionType'] =
                dataArraySplit[j] === 'transaction_type'
                  ? 'DEPOSIT'
                  : dataArraySplit[j];
            } else if (j === 2) {
              transaction['token'] =
                dataArraySplit[j];
            } else if (j === 3) {
              transaction['amount'] =
                dataArraySplit[j] === 'amount'
                  ? 0
                  : parseFloat(dataArraySplit[j]);
            }
          }
          chunk.push(transaction);
        }
        console.log(chunk);
        await connection
          .getRepository(Transactions)
          .createQueryBuilder('transactions')
          .insert()
          .into('transactions')
          .values(chunk)
          .execute();
      })
      .on('end', async () => {
        console.log('end');
      })
      .on('error', async (err: any) => {
        console.log(err);
      });
  }
}
