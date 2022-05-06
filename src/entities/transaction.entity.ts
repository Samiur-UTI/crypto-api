import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

// export enum transactionType {
//   WITHDRAWL = 'WITHDRAWAL',
//   DEPOSIT = 'DEPOSIT',
// }
@Entity('transactions')
export class Transactions {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: true,
    type: 'int',
  })
  timestamp: number;

  @Column({
    nullable: true,
    type: 'varchar',
    length: 20,
    // enum: [transactionType.WITHDRAWL, transactionType.DEPOSIT],
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
