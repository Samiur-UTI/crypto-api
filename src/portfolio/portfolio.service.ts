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
  async get(): Promise<void> {
    const transactions = await this.transactionsRepository.find();
  }
}
