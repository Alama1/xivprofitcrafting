import { MigrationInterface, QueryRunner } from "typeorm";

export class FloatFix1739706387573 implements MigrationInterface {
    name = 'FloatFix1739706387573'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "prices" DROP COLUMN "world_price"`);
        await queryRunner.query(`ALTER TABLE "prices" ADD "world_price" double precision`);
        await queryRunner.query(`ALTER TABLE "prices" DROP COLUMN "world_price_hq"`);
        await queryRunner.query(`ALTER TABLE "prices" ADD "world_price_hq" double precision`);
        await queryRunner.query(`ALTER TABLE "prices" DROP COLUMN "dc_price"`);
        await queryRunner.query(`ALTER TABLE "prices" ADD "dc_price" double precision`);
        await queryRunner.query(`ALTER TABLE "prices" DROP COLUMN "dc_price_hq"`);
        await queryRunner.query(`ALTER TABLE "prices" ADD "dc_price_hq" double precision`);
        await queryRunner.query(`ALTER TABLE "prices" DROP COLUMN "europe_price"`);
        await queryRunner.query(`ALTER TABLE "prices" ADD "europe_price" double precision`);
        await queryRunner.query(`ALTER TABLE "prices" DROP COLUMN "europe_price_hq"`);
        await queryRunner.query(`ALTER TABLE "prices" ADD "europe_price_hq" double precision`);
        await queryRunner.query(`ALTER TABLE "prices" DROP COLUMN "min_listing"`);
        await queryRunner.query(`ALTER TABLE "prices" ADD "min_listing" double precision`);
        await queryRunner.query(`ALTER TABLE "prices" DROP COLUMN "min_listing_hq"`);
        await queryRunner.query(`ALTER TABLE "prices" ADD "min_listing_hq" double precision`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "prices" DROP COLUMN "min_listing_hq"`);
        await queryRunner.query(`ALTER TABLE "prices" ADD "min_listing_hq" integer`);
        await queryRunner.query(`ALTER TABLE "prices" DROP COLUMN "min_listing"`);
        await queryRunner.query(`ALTER TABLE "prices" ADD "min_listing" integer`);
        await queryRunner.query(`ALTER TABLE "prices" DROP COLUMN "europe_price_hq"`);
        await queryRunner.query(`ALTER TABLE "prices" ADD "europe_price_hq" integer`);
        await queryRunner.query(`ALTER TABLE "prices" DROP COLUMN "europe_price"`);
        await queryRunner.query(`ALTER TABLE "prices" ADD "europe_price" integer`);
        await queryRunner.query(`ALTER TABLE "prices" DROP COLUMN "dc_price_hq"`);
        await queryRunner.query(`ALTER TABLE "prices" ADD "dc_price_hq" integer`);
        await queryRunner.query(`ALTER TABLE "prices" DROP COLUMN "dc_price"`);
        await queryRunner.query(`ALTER TABLE "prices" ADD "dc_price" integer`);
        await queryRunner.query(`ALTER TABLE "prices" DROP COLUMN "world_price_hq"`);
        await queryRunner.query(`ALTER TABLE "prices" ADD "world_price_hq" integer`);
        await queryRunner.query(`ALTER TABLE "prices" DROP COLUMN "world_price"`);
        await queryRunner.query(`ALTER TABLE "prices" ADD "world_price" integer`);
    }

}
