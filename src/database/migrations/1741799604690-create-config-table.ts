import { MigrationInterface, QueryRunner } from 'typeorm'

export class CreateConfig1741799957476 implements MigrationInterface {
    name = 'CreateConfig1741799957476'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "config" (
                "key" character varying(255) NOT NULL,
                "value" text NOT NULL,
                CONSTRAINT "PK_0c8be273f4d331441654b1625a4" PRIMARY KEY ("key")
            )
        `)
    }
    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE "config"
        `)
    }
}
