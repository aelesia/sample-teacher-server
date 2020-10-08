import { MigrationInterface, QueryRunner } from 'typeorm'

export class ChangeStudentTeacherEmailLength641602075328823 implements MigrationInterface {
  name = 'ChangeStudentTeacherEmailLength641602075328823'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX "IDX_00634394dce7677d531749ed8e"`)
    await queryRunner.query(`ALTER TABLE "teacher" DROP CONSTRAINT "UQ_00634394dce7677d531749ed8e8"`)
    await queryRunner.query(`ALTER TABLE "teacher" DROP COLUMN "email"`)
    await queryRunner.query(`ALTER TABLE "teacher" ADD "email" character varying(64) NOT NULL`)
    await queryRunner.query(`ALTER TABLE "teacher" ADD CONSTRAINT "UQ_00634394dce7677d531749ed8e8" UNIQUE ("email")`)
    await queryRunner.query(`DROP INDEX "IDX_a56c051c91dbe1068ad683f536"`)
    await queryRunner.query(`ALTER TABLE "student" DROP CONSTRAINT "UQ_a56c051c91dbe1068ad683f536e"`)
    await queryRunner.query(`ALTER TABLE "student" DROP COLUMN "email"`)
    await queryRunner.query(`ALTER TABLE "student" ADD "email" character varying(64) NOT NULL`)
    await queryRunner.query(`ALTER TABLE "student" ADD CONSTRAINT "UQ_a56c051c91dbe1068ad683f536e" UNIQUE ("email")`)
    await queryRunner.query(`CREATE INDEX "IDX_00634394dce7677d531749ed8e" ON "teacher" ("email") `)
    await queryRunner.query(`CREATE INDEX "IDX_a56c051c91dbe1068ad683f536" ON "student" ("email") `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX "IDX_a56c051c91dbe1068ad683f536"`)
    await queryRunner.query(`DROP INDEX "IDX_00634394dce7677d531749ed8e"`)
    await queryRunner.query(`ALTER TABLE "student" DROP CONSTRAINT "UQ_a56c051c91dbe1068ad683f536e"`)
    await queryRunner.query(`ALTER TABLE "student" DROP COLUMN "email"`)
    await queryRunner.query(`ALTER TABLE "student" ADD "email" character varying(32) NOT NULL`)
    await queryRunner.query(`ALTER TABLE "student" ADD CONSTRAINT "UQ_a56c051c91dbe1068ad683f536e" UNIQUE ("email")`)
    await queryRunner.query(`CREATE INDEX "IDX_a56c051c91dbe1068ad683f536" ON "student" ("email") `)
    await queryRunner.query(`ALTER TABLE "teacher" DROP CONSTRAINT "UQ_00634394dce7677d531749ed8e8"`)
    await queryRunner.query(`ALTER TABLE "teacher" DROP COLUMN "email"`)
    await queryRunner.query(`ALTER TABLE "teacher" ADD "email" character varying(32) NOT NULL`)
    await queryRunner.query(`ALTER TABLE "teacher" ADD CONSTRAINT "UQ_00634394dce7677d531749ed8e8" UNIQUE ("email")`)
    await queryRunner.query(`CREATE INDEX "IDX_00634394dce7677d531749ed8e" ON "teacher" ("email") `)
  }
}
