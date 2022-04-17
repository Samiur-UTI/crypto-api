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
    const repo = this.transactionsRepository;
    const s = readStream
      .pipe(es.split())
      .pipe(
        es.mapSync(async function (line: string) {
          s.pause();
          const lineArray = line.split(',');
          if (
            lineArray[0] !== 'timestamp' &&
            lineArray[1] !== 'transaction_type' &&
            lineArray[2] !== 'token' &&
            lineArray[3] !== 'amount'
          ) {
            const transaction = new Transactions();
            transaction.timestamp = parseInt(lineArray[0]);
            transaction.transactionType = lineArray[1];
            transaction.token = lineArray[2];
            transaction.amount = parseFloat(lineArray[3]);
            await repo.insert(transaction);
          }
          s.resume();
        }),
      )
      .on('error', function (err) {
        console.log('Error while reading file.', err);
      })
      .on('end', function () {
        console.log('Read entire file');
      });
  }
}
