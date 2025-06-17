import { Entity, PrimaryColumn } from 'typeorm'

@Entity(Segment.tableName)
export class Segment {
    static readonly tableName: string = 'segments'

    @PrimaryColumn({ type: 'varchar', length: 255 })
    name: string
}
