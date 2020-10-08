import { MigrationInterface, QueryRunner } from 'typeorm'

export class CreateSuspensions1601916116110 implements MigrationInterface {
  name = 'CreateSuspensions1601916116110'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "suspension" ("id" SERIAL NOT NULL, "active" boolean NOT NULL, "created_date" TIMESTAMP NOT NULL DEFAULT now(), "updated_date" TIMESTAMP NOT NULL DEFAULT now(), "student_id" integer, CONSTRAINT "PK_b46f45ab12700f920ef9237a967" PRIMARY KEY ("id"))`
    )
    await queryRunner.query(
      `ALTER TABLE "suspension" ADD CONSTRAINT "FK_26361dbb4b76d5dd0fca186a5d0" FOREIGN KEY ("student_id") REFERENCES "student"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "suspension" DROP CONSTRAINT "FK_26361dbb4b76d5dd0fca186a5d0"`)
    await queryRunner.query(`DROP TABLE "suspension"`)
  }
}
