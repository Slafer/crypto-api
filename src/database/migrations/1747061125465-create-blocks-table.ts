import { MigrationInterface, QueryRunner } from 'typeorm'

export class CreateBlocksTable1747061125465 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS "blocks" (
                "id" SERIAL PRIMARY KEY,
                "currency_id" integer NOT NULL,
                "hash" character varying NOT NULL,
                "height" integer NOT NULL,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "UQ_blocks_currency_height_hash" UNIQUE ("currency_id", "height", "hash")
            )
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "blocks"`)
    }
}
