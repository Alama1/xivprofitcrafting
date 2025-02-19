import { MigrationInterface, QueryRunner } from 'typeorm';

export class Meow1739709633398 implements MigrationInterface {
  name = 'Meow1739709633398';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "ingredient" ("id" SERIAL NOT NULL, "item_id" integer NOT NULL, "item_name" character varying NOT NULL, "amount" integer NOT NULL DEFAULT '1', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "recipeId" integer, "ingredientItemPriceId" integer, CONSTRAINT "PK_6f1e945604a0b59f56a57570e98" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `ALTER TABLE "recipe" ADD "item_id" integer NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "recipe" ADD "finalItemPriceId" integer`
    );
    await queryRunner.query(
      `ALTER TABLE "ingredient" ADD CONSTRAINT "FK_a19a4b507b9e2d1efd2d73b37bc" FOREIGN KEY ("recipeId") REFERENCES "recipe"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "ingredient" ADD CONSTRAINT "FK_62caae6fc59620c0a8859504b2e" FOREIGN KEY ("ingredientItemPriceId") REFERENCES "prices"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "recipe" ADD CONSTRAINT "FK_c0cca647be255897014df4d0b65" FOREIGN KEY ("finalItemPriceId") REFERENCES "prices"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "recipe" DROP CONSTRAINT "FK_c0cca647be255897014df4d0b65"`
    );
    await queryRunner.query(
      `ALTER TABLE "ingredient" DROP CONSTRAINT "FK_62caae6fc59620c0a8859504b2e"`
    );
    await queryRunner.query(
      `ALTER TABLE "ingredient" DROP CONSTRAINT "FK_a19a4b507b9e2d1efd2d73b37bc"`
    );
    await queryRunner.query(
      `ALTER TABLE "recipe" DROP COLUMN "finalItemPriceId"`
    );
    await queryRunner.query(`ALTER TABLE "recipe" DROP COLUMN "item_id"`);
    await queryRunner.query(`DROP TABLE "ingredient"`);
  }
}
