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
  async get(): Promise<Record<string, unknown>> {
    const btcDeposit = await this.connection
      .getRepository(Transactions)
      .createQueryBuilder('transactions')
      .select('SUM(amount)', 'amount')
      .where('token = :token', { token: 'BTC' })
      .andWhere('transactionType = :transactionType', {
        transactionType: 'DEPOSIT',
      })
      .getRawOne();
    const btcWithdrawal = await this.connection
      .getRepository(Transactions)
      .createQueryBuilder('transactions')
      .select('SUM(amount)', 'amount')
      .where('token = :token', { token: 'BTC' })
      .andWhere('transactionType = :transactionType', {
        transactionType: 'WITHDRAWAL',
      })
      .getRawOne();
    const ethDeposit = await this.connection
      .getRepository(Transactions)
      .createQueryBuilder('transactions')
      .select('SUM(amount)', 'amount')
      .where('token = :token', { token: 'ETH' })
      .andWhere('transactionType = :transactionType', {
        transactionType: 'DEPOSIT',
      })
      .getRawOne();
    const ethWithdrawal = await this.connection
      .getRepository(Transactions)
      .createQueryBuilder('transactions')
      .select('SUM(amount)', 'amount')
      .where('token = :token', { token: 'ETH' })
      .andWhere('transactionType = :transactionType', {
        transactionType: 'WITHDRAWAL',
      })
      .getRawOne();
    const xrpDeposit = await this.connection
      .getRepository(Transactions)
      .createQueryBuilder('transactions')
      .select('SUM(amount)', 'amount')
      .where('token = :token', { token: 'XRP' })
      .andWhere('transactionType = :transactionType', {
        transactionType: 'DEPOSIT',
      })
      .getRawOne();
    const xrpWithdrawal = await this.connection
      .getRepository(Transactions)
      .createQueryBuilder('transactions')
      .select('SUM(amount)', 'amount')
      .where('token = :token', { token: 'XRP' })
      .andWhere('transactionType = :transactionType', {
        transactionType: 'WITHDRAWAL',
      })
      .getRawOne();
    return {
      btcPortfolio: btcDeposit.amount - btcWithdrawal.amount,
      ethPortfolio: ethDeposit.amount - ethWithdrawal.amount,
      xrpPortfolio: xrpDeposit.amount - xrpWithdrawal.amount,
    };
  }
}
