import { Entity, PrimaryColumn } from 'typeorm'

@Entity(Group.tableName)
export class Group {
    static readonly tableName: string = 'groups'

    @PrimaryColumn({ type: 'varchar', length: 255 })
    name: string
}
