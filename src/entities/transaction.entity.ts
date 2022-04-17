import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

export enum transactionType {
  WITHDRAWL = 'WITHDRAWAL',
  DEPOSIT = 'DEPOSIT',
}
@Entity('transactions')
export class Transactions {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: false,
    type: 'int',
  })
  timestamp: number;

  @Column({
    nullable: false,
    type: 'enum',
    enum: [transactionType.WITHDRAWL, transactionType.DEPOSIT],
  })
  transactionType: string;

  @Column({
    nullable: false,
    type: 'varchar',
    length: 5,
  })
  token: string;

  @Column({
    nullable: false,
    type: 'float',
  })
  amount: number;
}
