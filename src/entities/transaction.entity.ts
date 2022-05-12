import { Entity, Column, PrimaryGeneratedColumn, Index } from 'typeorm';

export enum transactionType {
  WITHDRAWL = 'WITHDRAWAL',
  DEPOSIT = 'DEPOSIT',
}
@Entity('transactions')
export class Transactions {
  @PrimaryGeneratedColumn()
  id: number;

  @Index()
  @Column({
    nullable: true,
    type: 'date',
  })
  timestamp: string;

  @Column({
    nullable: true,
    type: 'enum',
    enum: [transactionType.WITHDRAWL, transactionType.DEPOSIT],
  })
  transactionType: string;

  @Column({
    nullable: true,
    type: 'varchar',
    length: 20,
  })
  token?: string;

  @Column({
    nullable: true,
    type: 'float',
  })
  amount: number;
  transaction_type: any;
}
