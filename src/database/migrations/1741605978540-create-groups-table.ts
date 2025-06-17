import { MigrationInterface, QueryRunner } from 'typeorm'

export class CreateGroups1741605978540 implements MigrationInterface {
    name = 'CreateGroups1741605978540'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "groups" (
            "name" character varying(255) NOT NULL,
            CONSTRAINT "PK_659d1483316afb28afd3a90646e" PRIMARY KEY ("name"))
        `)

        await queryRunner.query(`
            INSERT INTO "groups" ("name") VALUES
            ('BTC'),
            ('BCH'),
            ('LTC'),
            ('KAS'),
            ('DOGE'),
            ('EVM'),
            ('TON'),
            ('SOL'),
            ('TVM'),
            ('XRPL')
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "groups"`)
    }
}
