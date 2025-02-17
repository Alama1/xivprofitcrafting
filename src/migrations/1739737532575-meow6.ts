import { MigrationInterface, QueryRunner } from "typeorm";

export class Meow61739737532575 implements MigrationInterface {
    name = 'Meow61739737532575'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "recipe" ADD CONSTRAINT "UQ_bbaf66acc7e7c6dc3d1bc42a247" UNIQUE ("item_id")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "recipe" DROP CONSTRAINT "UQ_bbaf66acc7e7c6dc3d1bc42a247"`);
    }

}
