import { MigrationInterface, QueryRunner } from "typeorm";

export class Meow41739712904170 implements MigrationInterface {
    name = 'Meow41739712904170'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ingredient" DROP CONSTRAINT "FK_62caae6fc59620c0a8859504b2e"`);
        await queryRunner.query(`ALTER TABLE "ingredient" DROP CONSTRAINT "FK_a19a4b507b9e2d1efd2d73b37bc"`);
        await queryRunner.query(`ALTER TABLE "ingredient" DROP COLUMN "recipeId"`);
        await queryRunner.query(`ALTER TABLE "ingredient" DROP COLUMN "ingredientItemPriceId"`);
        await queryRunner.query(`ALTER TABLE "ingredient" ADD "recipe_id" integer`);
        await queryRunner.query(`ALTER TABLE "ingredient" ADD "ingredient_item_price_id" integer`);
        await queryRunner.query(`ALTER TABLE "ingredient" ADD CONSTRAINT "FK_1a884e9b70245ac229ded0d8248" FOREIGN KEY ("recipe_id") REFERENCES "recipe"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ingredient" ADD CONSTRAINT "FK_33ce535a2d6ba1ab1756e0c3d5e" FOREIGN KEY ("ingredient_item_price_id") REFERENCES "prices"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ingredient" DROP CONSTRAINT "FK_33ce535a2d6ba1ab1756e0c3d5e"`);
        await queryRunner.query(`ALTER TABLE "ingredient" DROP CONSTRAINT "FK_1a884e9b70245ac229ded0d8248"`);
        await queryRunner.query(`ALTER TABLE "ingredient" DROP COLUMN "ingredient_item_price_id"`);
        await queryRunner.query(`ALTER TABLE "ingredient" DROP COLUMN "recipe_id"`);
        await queryRunner.query(`ALTER TABLE "ingredient" ADD "ingredientItemPriceId" integer`);
        await queryRunner.query(`ALTER TABLE "ingredient" ADD "recipeId" integer`);
        await queryRunner.query(`ALTER TABLE "ingredient" ADD CONSTRAINT "FK_a19a4b507b9e2d1efd2d73b37bc" FOREIGN KEY ("recipeId") REFERENCES "recipe"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ingredient" ADD CONSTRAINT "FK_62caae6fc59620c0a8859504b2e" FOREIGN KEY ("ingredientItemPriceId") REFERENCES "prices"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
