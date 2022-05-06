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
  async read(): Promise<void | any> {
    const readStream = fs.createReadStream(dirPathRead);
    const connection = this.connection;
    try {
      const response = await this.transactionsRepository.find();
      if (!response.length) {
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
                  transaction['timestamp'] = Number(dataArraySplit[j])
                    ? Number(dataArraySplit[j])
                    : 0;
                } else if (j === 1) {
                  transaction['transactionType'] =
                    dataArraySplit[j] === 'transaction_type'
                      ? 'DEPOSIT'
                      : dataArraySplit[j];
                } else if (j === 2) {
                  transaction['token'] =
                    dataArraySplit[j] === 'token' ? '' : dataArraySplit[j];
                } else if (j === 3) {
                  transaction['amount'] = parseFloat(dataArraySplit[j])
                    ? parseFloat(dataArraySplit[j])
                    : 0;
                }
              }
              chunk.push(transaction);
            }
            const response = await connection
              .getRepository(Transactions)
              .createQueryBuilder('transactions')
              .insert()
              .into('transactions')
              .values(chunk)
              .execute();
            // console.log(response);
          })
          .on('end', async () => {
            console.log('end');
          })
          .on('error', async (err: any) => {
            console.log(err);
          });
      }
      return 'DATA ALREADY EXISTS';
    } catch (error) {
      throw new Error(error);
    }
  }
}
