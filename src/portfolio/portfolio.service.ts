import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
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

@Injectable()
export class PortfolioService {
  constructor(
    @InjectRepository(Transactions)
    private transactionsRepository: Repository<Transactions>,
    private connection: Connection,
  ) {}
  async getTokenPortfolio(token: string): Promise<Record<any, any>> {
    const deposit = await this.connection
      .getRepository(Transactions)
      .createQueryBuilder('transactions')
      .select('SUM(amount)', 'amount')
      .where('token = :token', { token })
      .andWhere('transactionType = :transactionType', {
        transactionType: 'DEPOSIT',
      })
      .orderBy('timestamp')
      .getRawOne();
    const withdrawal = await this.connection
      .getRepository(Transactions)
      .createQueryBuilder('transactions')
      .select('SUM(amount)', 'amount')
      .where('token = :token', { token })
      .andWhere('transactionType = :transactionType', {
        transactionType: 'WITHDRAWAL',
      })
      .orderBy('timestamp')
      .getRawOne();
    return {
      token,
      portfolio: deposit.amount - withdrawal.amount,
    };
  }
  async getTokens(): Promise<any> {
    const raw = await this.connection
      .getRepository(Transactions)
      .createQueryBuilder('transactions')
      .select('token', 'token')
      .groupBy('token')
      .getRawMany();
    const parsed = raw.reduce((acc: any[], token: { token: string }) => {
      if (token.token !== '') {
        acc.push(token.token);
      }
      return acc;
    }, []);
    return parsed;
  }
  async getDatePortfolio(timestamp: string, token: string): Promise<any> {
    console.log('TIMESTAMP IS: ', timestamp);
    const deposit = await this.connection
      .getRepository(Transactions)
      .createQueryBuilder('transactions')
      .select('token', 'token')
      .select('SUM(amount)', 'amount')
      .where('timestamp = :timestamp', { timestamp })
      .andWhere('transactionType = :transactionType', {
        transactionType: 'DEPOSIT',
      })
      .andWhere('token = :token', { token })
      .groupBy('token')
      .getRawMany();
    const withdrawal = await this.connection
      .getRepository(Transactions)
      .createQueryBuilder('transactions')
      .select('token', 'token')
      .select('SUM(amount)', 'amount')
      .where('timestamp = :timestamp', { timestamp })
      .andWhere('transactionType = :transactionType', {
        transactionType: 'WITHDRAWAL',
      })
      .andWhere('token = :token', { token })
      .groupBy('token')
      .getRawMany();
    return {
      token,
      portfolio: deposit[0].amount - withdrawal[0].amount,
    };
  }
}
