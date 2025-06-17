import { Entity, Column, PrimaryColumn } from 'typeorm'

@Entity(Config.tableName)
export class Config {
    static readonly tableName: string = 'settings'

    @PrimaryColumn({ type: 'varchar', length: 255 })
    key: string

    @Column({ type: 'text' })
    value: string
}
