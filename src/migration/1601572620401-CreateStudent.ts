import { MigrationInterface, QueryRunner } from 'typeorm'

export class CreateStudent1601572620401 implements MigrationInterface {
  name = 'CreateStudent1601572620401'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "student" ("id" SERIAL NOT NULL, "uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "first_name" character varying(32) NOT NULL, "last_name" character varying(32) NOT NULL, "email" character varying(32) NOT NULL, "created_date" TIMESTAMP NOT NULL DEFAULT now(), "updated_date" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_e11fbd60aaa3196597d36f2bbfb" UNIQUE ("uuid"), CONSTRAINT "UQ_a56c051c91dbe1068ad683f536e" UNIQUE ("email"), CONSTRAINT "PK_3d8016e1cb58429474a3c041904" PRIMARY KEY ("id"))`
    )
    await queryRunner.query(`CREATE INDEX "IDX_e11fbd60aaa3196597d36f2bbf" ON "student" ("uuid") `)
    await queryRunner.query(`CREATE INDEX "IDX_a56c051c91dbe1068ad683f536" ON "student" ("email") `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX "IDX_a56c051c91dbe1068ad683f536"`)
    await queryRunner.query(`DROP INDEX "IDX_e11fbd60aaa3196597d36f2bbf"`)
    await queryRunner.query(`DROP TABLE "student"`)
  }
}
