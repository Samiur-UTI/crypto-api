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
  async getBtcPortFolio(): Promise<Record<string, unknown>> {
    const btcDeposit = await this.connection
      .getRepository(Transactions)
      .createQueryBuilder('transactions')
      .select('SUM(amount)', 'amount')
      .where('token = :token', { token: 'BTC' })
      .andWhere('transactionType = :transactionType', {
        transactionType: 'DEPOSIT',
      })
      .orderBy('timestamp')
      .getRawOne();
    const btcWithdrawal = await this.connection
      .getRepository(Transactions)
      .createQueryBuilder('transactions')
      .select('SUM(amount)', 'amount')
      .where('token = :token', { token: 'BTC' })
      .andWhere('transactionType = :transactionType', {
        transactionType: 'WITHDRAWAL',
      })
      .orderBy('timestamp')
      .getRawOne();

    return {
      btcPortfolio: btcDeposit.amount - btcWithdrawal.amount,
    };
  }
  async getEthPortfolio(): Promise<Record<string, unknown>> {
    const ethDeposit = await this.connection
      .getRepository(Transactions)
      .createQueryBuilder('transactions')
      .select('SUM(amount)', 'amount')
      .where('token = :token', { token: 'ETH' })
      .andWhere('transactionType = :transactionType', {
        transactionType: 'DEPOSIT',
      })
      .orderBy('timestamp')
      .getRawOne();
    const ethWithdrawal = await this.connection
      .getRepository(Transactions)
      .createQueryBuilder('transactions')
      .select('SUM(amount)', 'amount')
      .where('token = :token', { token: 'ETH' })
      .andWhere('transactionType = :transactionType', {
        transactionType: 'WITHDRAWAL',
      })
      .orderBy('timestamp')
      .getRawOne();
    return {
      ethPortfolio: ethDeposit.amount - ethWithdrawal.amount,
    };
  }
  async getXrpPortfolio(): Promise<Record<string, number>> {
    const xrpDeposit = await this.connection
      .getRepository(Transactions)
      .createQueryBuilder('transactions')
      .select('SUM(amount)', 'amount')
      .where('token = :token', { token: 'XRP' })
      .andWhere('transactionType = :transactionType', {
        transactionType: 'DEPOSIT',
      })
      .orderBy('timestamp')
      .getRawOne();
    const xrpWithdrawal = await this.connection
      .getRepository(Transactions)
      .createQueryBuilder('transactions')
      .select('SUM(amount)', 'amount')
      .where('token = :token', { token: 'XRP' })
      .andWhere('transactionType = :transactionType', {
        transactionType: 'WITHDRAWAL',
      })
      .orderBy('timestamp')
      .getRawOne();
    return {
      xrpPortfolio: xrpDeposit.amount - xrpWithdrawal.amount,
    };
  }
}
