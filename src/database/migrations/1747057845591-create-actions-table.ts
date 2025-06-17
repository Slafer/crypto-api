import { MigrationInterface, QueryRunner } from 'typeorm'

export class CreateActionsTable1747057845591 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS "actions" (
                "id" SERIAL PRIMARY KEY,
                "transaction_id" character varying NOT NULL,
                "crypto_address_id" integer NOT NULL,
                "value" decimal(20,8) NOT NULL,
                "tx_out_index" integer NOT NULL,
                "script" character varying NOT NULL,
                "spent" boolean NOT NULL DEFAULT false,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now()
            )
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "actions"`)
    }
}
