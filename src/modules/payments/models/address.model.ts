import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

@Entity(Address.tableName)
export class Address {
    static readonly tableName = 'addresses'

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    address: string

    @Column()
    currency: string

    @Column()
    foreignId: string

    @Column()
    segment: string

    @Column()
    fingerprint: string

    @Column()
    path: string

    @Column()
    group: string

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date
}
