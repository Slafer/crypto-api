import { Entity, Column, CreateDateColumn, UpdateDateColumn, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm'

@Entity(Currency.tableName)
export class Currency {
    static readonly tableName: string = 'currencies'

    @PrimaryColumn()
    id: number

    @Column({ type: 'varchar', unique: true, length: 255 })
    name: string

    @Column({ type: 'varchar', unique: true, length: 50 })
    symbol: string

    @Column({ type: 'varchar', length: 255 })
    group: string

    @Column({ type: 'decimal', precision: 12, scale: 2, default: 0 })
    price: number

    @Column({ type: 'decimal', precision: 18, scale: 6, default: 0 })
    min: number

    @Column({ type: 'decimal', precision: 18, scale: 6, default: 0 })
    max: number

    @Column({ default: false })
    active: boolean

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date
}
