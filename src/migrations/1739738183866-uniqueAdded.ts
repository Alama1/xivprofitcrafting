import { MigrationInterface, QueryRunner } from "typeorm";

export class UniqueAdded1739738183866 implements MigrationInterface {
    name = 'UniqueAdded1739738183866'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "recipe" DROP CONSTRAINT "UQ_bbaf66acc7e7c6dc3d1bc42a247"`);
        await queryRunner.query(`ALTER TABLE "ingredient" ADD CONSTRAINT "UQ_80cea58827498e1e6cf862df3ae" UNIQUE ("item_id", "recipe_id")`);
        await queryRunner.query(`ALTER TABLE "recipe" ADD CONSTRAINT "UQ_6da3f7fc864a2cc6f48b095c548" UNIQUE ("item_id", "class_job")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "recipe" DROP CONSTRAINT "UQ_6da3f7fc864a2cc6f48b095c548"`);
        await queryRunner.query(`ALTER TABLE "ingredient" DROP CONSTRAINT "UQ_80cea58827498e1e6cf862df3ae"`);
        await queryRunner.query(`ALTER TABLE "recipe" ADD CONSTRAINT "UQ_bbaf66acc7e7c6dc3d1bc42a247" UNIQUE ("item_id")`);
    }

}
