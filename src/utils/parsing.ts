/* eslint-disable @typescript-eslint/no-empty-function */
import { Injectable, CACHE_MANAGER, Inject } from '@nestjs/common';
import { Transactions } from '../entities/transaction.entity';
import { Cache } from 'cache-manager';
@Injectable()
export class ParsingService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}
  async parse(data: string): Promise<Array<string>> {
    const dataArray = data.toString().split('\n');
    const cachedBrokenStream: string = await this.cacheManager.get(
      'trimmedEnd',
    );
    dataArray[0] = cachedBrokenStream
      ? cachedBrokenStream + dataArray[0]
      : dataArray[0];
    const trimmedEnd = dataArray.pop();
    await this.cacheManager.set('trimmedEnd', trimmedEnd);

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
    return chunk;
  }
}
