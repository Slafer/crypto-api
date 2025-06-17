import { MigrationInterface, QueryRunner } from 'typeorm'

export class CreateAddressesTable1741789551568 implements MigrationInterface {
    name = 'CreateAddressesTable1741789551568'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "addresses" (
               "id" BIGSERIAL PRIMARY KEY,
               "address" character varying NOT NULL,
               "currency" character varying NOT NULL,
               "foreign_id" character varying NOT NULL,
               "segment" character varying NOT NULL,
               "fingerprint" character varying NOT NULL, 
               "path" character varying NOT NULL,  
               "group" character varying NOT NULL,  
               "created_at" TIMESTAMP NOT NULL DEFAULT now(),
               "updated_at" TIMESTAMP NOT NULL DEFAULT now()
            )
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE "addresses"
        `)
    }
}
