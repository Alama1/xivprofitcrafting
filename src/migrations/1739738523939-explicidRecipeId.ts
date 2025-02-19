import { MigrationInterface, QueryRunner } from 'typeorm';

export class ExplicidRecipeId1739738523939 implements MigrationInterface {
  name = 'ExplicidRecipeId1739738523939';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "ingredient" DROP CONSTRAINT "FK_1a884e9b70245ac229ded0d8248"`
    );
    await queryRunner.query(
      `ALTER TABLE "ingredient" DROP CONSTRAINT "UQ_80cea58827498e1e6cf862df3ae"`
    );
    await queryRunner.query(
      `ALTER TABLE "ingredient" ALTER COLUMN "recipe_id" SET NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "ingredient" ADD CONSTRAINT "UQ_80cea58827498e1e6cf862df3ae" UNIQUE ("item_id", "recipe_id")`
    );
    await queryRunner.query(
      `ALTER TABLE "ingredient" ADD CONSTRAINT "FK_1a884e9b70245ac229ded0d8248" FOREIGN KEY ("recipe_id") REFERENCES "recipe"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "ingredient" DROP CONSTRAINT "FK_1a884e9b70245ac229ded0d8248"`
    );
    await queryRunner.query(
      `ALTER TABLE "ingredient" DROP CONSTRAINT "UQ_80cea58827498e1e6cf862df3ae"`
    );
    await queryRunner.query(
      `ALTER TABLE "ingredient" ALTER COLUMN "recipe_id" DROP NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "ingredient" ADD CONSTRAINT "UQ_80cea58827498e1e6cf862df3ae" UNIQUE ("item_id", "recipe_id")`
    );
    await queryRunner.query(
      `ALTER TABLE "ingredient" ADD CONSTRAINT "FK_1a884e9b70245ac229ded0d8248" FOREIGN KEY ("recipe_id") REFERENCES "recipe"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }
}
