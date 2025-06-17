import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { TransactionStatus } from 'venom-core/dist'

@Entity(Withdrawal.tableName)
export class Withdrawal {
    static readonly tableName = 'withdrawals'

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    foreignId: string

    @Column('decimal', { precision: 36, scale: 18 })
    amount: number

    @Column()
    currency: string

    @Column()
    address: string

    @Column({ unique: true })
    requestId: string

    @Column({ default: TransactionStatus.Processing })
    status: string

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date
}
