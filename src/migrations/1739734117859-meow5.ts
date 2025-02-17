import { MigrationInterface, QueryRunner } from "typeorm";

export class Meow51739734117859 implements MigrationInterface {
    name = 'Meow51739734117859'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "recipe" ADD "amout_result" integer NOT NULL DEFAULT '1'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "recipe" DROP COLUMN "amout_result"`);
    }

}
