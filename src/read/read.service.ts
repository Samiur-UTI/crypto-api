import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { Transactions } from 'src/entities/transaction.entity';
const dirPath = path.join(__dirname, '../../src/assets/transactions.csv');
@Injectable()
export class ReadService {
  constructor() {}
  async read(): Promise<any> {
    const readStream = fs.createReadStream(dirPath);
    function streamReader(stream: fs.ReadStream) {
      return new Promise<any>((resolve, reject) => {
        const transactions: Transactions[] = [];
        stream.on('data', (chunk) => {
          const line = chunk.toString();
          const [timestamp, transactionType, token, amount] = line.split(',');
          transactions.push({
            timestamp: Number(timestamp),
            transactionType: transactionType,
            token: token,
            amount: Number(amount),
          });
        });
        stream.on('end', () => {
          resolve(transactions);
        });
        stream.on('error', (err) => {
          reject(err);
        });
      });
    }
    return await streamReader(readStream);
  }
}
