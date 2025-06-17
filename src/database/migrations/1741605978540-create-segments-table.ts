import { MigrationInterface, QueryRunner } from 'typeorm'

export class CreateSegments1741605978550 implements MigrationInterface {
    name = 'CreateSegments1741605978550'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "segments" (
            "name" character varying(255) NOT NULL,
            CONSTRAINT "PK_659d1483716afb28afd3a90646f" PRIMARY KEY ("name"))
        `)

        await queryRunner.query(`
            INSERT INTO "segments" ("name") VALUES
              ('grey'),
              ('white'),
              ('blue'),
              ('black'),
              ('green')
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "segments"`)
    }
}
