import { MigrationInterface, QueryRunner } from "typeorm";

export class HqPriceAddedToEntity1739701080459 implements MigrationInterface {
    name = 'HqPriceAddedToEntity1739701080459'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "prices" ADD "price_hq" integer NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "prices" DROP COLUMN "price_hq"`);
    }

}
