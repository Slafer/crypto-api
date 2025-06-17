import { MigrationInterface, QueryRunner } from 'typeorm'

export class CreateTransactionTable1741605978538 implements MigrationInterface {
    name = 'CreateTransactionTable1741605978538'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
           CREATE TABLE "withdrawals" (
               "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
               "foreign_id" character varying NOT NULL, 
               "amount" numeric(36,18) NOT NULL,
               "currency" character varying NOT NULL,
               "address" character varying NOT NULL, 
               "request_id" character varying NOT NULL,
               "status" character varying NOT NULL DEFAULT 'processing', 
               "created_at" TIMESTAMP NOT NULL DEFAULT now(), 
               "updated_at" TIMESTAMP NOT NULL DEFAULT now(), 
               CONSTRAINT "UQ_580649e17616fa518604d1de6b0" UNIQUE ("request_id"), 
               CONSTRAINT "PK_9871ec481baa7755f8bd8b7c7e9" PRIMARY KEY ("id"))
               `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "withdrawals"`)
    }
}
