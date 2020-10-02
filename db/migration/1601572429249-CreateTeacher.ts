import { MigrationInterface, QueryRunner } from 'typeorm'

export class CreateTeacher1601572429249 implements MigrationInterface {
  name = 'CreateTeacher1601572429249'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "teacher" ("id" SERIAL NOT NULL, "uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "first_name" character varying(32) NOT NULL, "last_name" character varying(32) NOT NULL, "email" character varying(32) NOT NULL, "created_date" TIMESTAMP NOT NULL DEFAULT now(), "updated_date" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_1905b1ed1612ef0a96c77fb7222" UNIQUE ("uuid"), CONSTRAINT "UQ_00634394dce7677d531749ed8e8" UNIQUE ("email"), CONSTRAINT "PK_2f807294148612a9751dacf1026" PRIMARY KEY ("id"))`
    )
    await queryRunner.query(`CREATE INDEX "IDX_1905b1ed1612ef0a96c77fb722" ON "teacher" ("uuid") `)
    await queryRunner.query(`CREATE INDEX "IDX_00634394dce7677d531749ed8e" ON "teacher" ("email") `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX "IDX_00634394dce7677d531749ed8e"`)
    await queryRunner.query(`DROP INDEX "IDX_1905b1ed1612ef0a96c77fb722"`)
    await queryRunner.query(`DROP TABLE "teacher"`)
  }
}
