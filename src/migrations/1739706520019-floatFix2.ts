import { MigrationInterface, QueryRunner } from 'typeorm';

export class FloatFix21739706520019 implements MigrationInterface {
  name = 'FloatFix21739706520019';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "prices" DROP COLUMN "daily_sales"`);
    await queryRunner.query(
      `ALTER TABLE "prices" ADD "daily_sales" double precision NOT NULL DEFAULT '0'`
    );
    await queryRunner.query(
      `ALTER TABLE "prices" DROP COLUMN "daily_sales_hq"`
    );
    await queryRunner.query(
      `ALTER TABLE "prices" ADD "daily_sales_hq" double precision NOT NULL DEFAULT '0'`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "prices" DROP COLUMN "daily_sales_hq"`
    );
    await queryRunner.query(
      `ALTER TABLE "prices" ADD "daily_sales_hq" integer NOT NULL DEFAULT '0'`
    );
    await queryRunner.query(`ALTER TABLE "prices" DROP COLUMN "daily_sales"`);
    await queryRunner.query(
      `ALTER TABLE "prices" ADD "daily_sales" integer NOT NULL DEFAULT '0'`
    );
  }
}
