import { MigrationInterface, QueryRunner } from 'typeorm';

export class Init1739700340092 implements MigrationInterface {
  name = 'Init1739700340092';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "recipe" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "class_job" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_e365a2fedf57238d970e07825ca" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "prices" ("id" SERIAL NOT NULL, "price" integer NOT NULL DEFAULT '0', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_2e40b9e4e631a53cd514d82ccd2" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "ingridient" ("id" SERIAL NOT NULL, "item_id" integer NOT NULL, "item_name" character varying NOT NULL, "amount" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "recipeId" integer, CONSTRAINT "PK_5eab6c7cf1141368de48e8e55bb" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `ALTER TABLE "ingridient" ADD CONSTRAINT "FK_a2fadc33685f5afd2670d565270" FOREIGN KEY ("recipeId") REFERENCES "recipe"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "ingridient" DROP CONSTRAINT "FK_a2fadc33685f5afd2670d565270"`
    );
    await queryRunner.query(`DROP TABLE "ingridient"`);
    await queryRunner.query(`DROP TABLE "prices"`);
    await queryRunner.query(`DROP TABLE "recipe"`);
  }
}
