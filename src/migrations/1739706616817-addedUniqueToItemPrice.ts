import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedUniqueToItemPrice1739706616817 implements MigrationInterface {
    name = 'AddedUniqueToItemPrice1739706616817'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "prices" ADD CONSTRAINT "UQ_cf920c80a8083af2ca9849fbe14" UNIQUE ("item_id")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "prices" DROP CONSTRAINT "UQ_cf920c80a8083af2ca9849fbe14"`);
    }

}
