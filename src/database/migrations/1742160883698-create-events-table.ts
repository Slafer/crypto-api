import { MigrationInterface, QueryRunner } from 'typeorm'

export class CreateEventsTable1742160883698 implements MigrationInterface {
    name = 'CreateEventsTable1742160883698'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE "events" (
               "id" character varying NOT NULL,
               "segment" character varying NOT NULL, 
               "url" character varying NOT NULL, 
               "payload" jsonb NOT NULL,
               "processed" boolean NOT NULL DEFAULT false, 
               "confirmed" boolean NOT NULL DEFAULT false, 
               "created_at" TIMESTAMP NOT NULL DEFAULT now(), 
               "updated_at" TIMESTAMP NOT NULL DEFAULT now(), 
               CONSTRAINT "PK_40731c7151fe4be3116e45ddf73" PRIMARY KEY ("id"),
               CONSTRAINT "FK_d530c59870c4182db13548e01c9" FOREIGN KEY ("segment") REFERENCES "segments" ("name") ON DELETE RESTRICT
               )`
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "events"`)
    }
}
