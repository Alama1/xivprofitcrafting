import { MigrationInterface, QueryRunner } from 'typeorm';

export class Yeah1739706242972 implements MigrationInterface {
  name = 'Yeah1739706242972';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "prices" DROP COLUMN "price"`);
    await queryRunner.query(`ALTER TABLE "prices" DROP COLUMN "price_hq"`);
    await queryRunner.query(
      `ALTER TABLE "prices" ADD "item_id" integer NOT NULL`
    );
    await queryRunner.query(`ALTER TABLE "prices" ADD "world_price" integer`);
    await queryRunner.query(
      `ALTER TABLE "prices" ADD "world_price_hq" integer`
    );
    await queryRunner.query(`ALTER TABLE "prices" ADD "dc_price" integer`);
    await queryRunner.query(`ALTER TABLE "prices" ADD "dc_price_hq" integer`);
    await queryRunner.query(`ALTER TABLE "prices" ADD "europe_price" integer`);
    await queryRunner.query(
      `ALTER TABLE "prices" ADD "europe_price_hq" integer`
    );
    await queryRunner.query(`ALTER TABLE "prices" ADD "min_listing" integer`);
    await queryRunner.query(
      `ALTER TABLE "prices" ADD "min_listing_hq" integer`
    );
    await queryRunner.query(
      `ALTER TABLE "prices" ADD "daily_sales" integer NOT NULL DEFAULT '0'`
    );
    await queryRunner.query(
      `ALTER TABLE "prices" ADD "daily_sales_hq" integer NOT NULL DEFAULT '0'`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "prices" DROP COLUMN "daily_sales_hq"`
    );
    await queryRunner.query(`ALTER TABLE "prices" DROP COLUMN "daily_sales"`);
    await queryRunner.query(
      `ALTER TABLE "prices" DROP COLUMN "min_listing_hq"`
    );
    await queryRunner.query(`ALTER TABLE "prices" DROP COLUMN "min_listing"`);
    await queryRunner.query(
      `ALTER TABLE "prices" DROP COLUMN "europe_price_hq"`
    );
    await queryRunner.query(`ALTER TABLE "prices" DROP COLUMN "europe_price"`);
    await queryRunner.query(`ALTER TABLE "prices" DROP COLUMN "dc_price_hq"`);
    await queryRunner.query(`ALTER TABLE "prices" DROP COLUMN "dc_price"`);
    await queryRunner.query(
      `ALTER TABLE "prices" DROP COLUMN "world_price_hq"`
    );
    await queryRunner.query(`ALTER TABLE "prices" DROP COLUMN "world_price"`);
    await queryRunner.query(`ALTER TABLE "prices" DROP COLUMN "item_id"`);
    await queryRunner.query(
      `ALTER TABLE "prices" ADD "price_hq" integer NOT NULL DEFAULT '0'`
    );
    await queryRunner.query(
      `ALTER TABLE "prices" ADD "price" integer NOT NULL DEFAULT '0'`
    );
  }
}
