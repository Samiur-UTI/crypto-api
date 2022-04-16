import {
  Injectable,
  BadRequestException,
  NotFoundException,
  StreamableFile,
} from '@nestjs/common';
import { CsvParser } from 'nest-csv-parser';
import * as fs from 'fs';
import * as path from 'path';
import * as es from 'event-stream';
import { Transactions } from 'src/entities/transaction.entity';
const dirPathRead = path.join(__dirname, '../../src/assets/transactions.csv');
const dirPathWrite = path.join(__dirname, '../../src/assets/transactions.json');

@Injectable()
export class ReadService {
  constructor(private readonly csvParser: CsvParser) {}
  async read(): Promise<any> {
    const readStream = fs.createReadStream(dirPathRead);
    const writeStream = fs.createWriteStream(dirPathWrite);
    let count = 0;
    const s = readStream
      .pipe(es.split())
      .pipe(
        es.mapSync(function (line: string) {
          s.pause();
          count++;
          const lineArray = line.split(',');
          writeStream.write(
            JSON.stringify({
              timestamp: lineArray[0],
              transactionType: lineArray[1],
              token: lineArray[2],
              amount: lineArray[3],
            }) + '\n',
          );
          s.resume();
        }),
      )
      .on('error', function (err) {
        console.log('Error while reading file.', err);
      })
      .on('end', function () {
        console.log('Read entire file', count);
      });
  }
}
