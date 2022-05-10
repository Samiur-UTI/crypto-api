/* eslint-disable @typescript-eslint/no-empty-function */
import { Injectable, CACHE_MANAGER, Inject } from '@nestjs/common';
import { Transactions } from '../entities/transaction.entity';
import { Cache } from 'cache-manager';
@Injectable()
export class ParsingService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}
  parse(data: string): any {
    let trimmedEnd = '';
    let dataArray = data.toString().split('\n');
    if (dataArray[dataArray.length - 1] === '') {
      dataArray = dataArray;
    } else {
      trimmedEnd = dataArray.pop()
      
    }
    // const dataArrayLength = dataArray.length;
    // const chunk = [];
    // for (let i = 0; i < dataArrayLength; i++) {
    //   const dataArraySplit = dataArray[i].split(',');
    //   const dataArraySplitLength = dataArraySplit.length;
    //   const transaction = {};
    //   for (let j = 0; j < dataArraySplitLength; j++) {
    //     if (j === 0) {
    //       transaction['timestamp'] = Number(dataArraySplit[j])
    //         ? Number(dataArraySplit[j])
    //         : 0;
    //     } else if (j === 1) {
    //       transaction['transactionType'] =
    //         dataArraySplit[j] === 'transaction_type'
    //           ? 'DEPOSIT'
    //           : dataArraySplit[j];
    //     } else if (j === 2) {
    //       transaction['token'] =
    //         dataArraySplit[j] === 'token' ? '' : dataArraySplit[j];
    //     } else if (j === 3) {
    //       transaction['amount'] = parseFloat(dataArraySplit[j])
    //         ? parseFloat(dataArraySplit[j])
    //         : 0;
    //     }
    //   }
    //   chunk.push(transaction);
    // }
    // return chunk;
  }
}
