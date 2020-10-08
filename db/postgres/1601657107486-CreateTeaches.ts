import { MigrationInterface, QueryRunner } from 'typeorm'

export class CreateTeaches1601657107486 implements MigrationInterface {
  name = 'CreateTeaches1601657107486'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "teaches" ("id" SERIAL NOT NULL, "created_date" TIMESTAMP NOT NULL DEFAULT now(), "updated_date" TIMESTAMP NOT NULL DEFAULT now(), "teacher_id" integer, "student_id" integer, CONSTRAINT "PK_2c438b17cd854564e449d83e248" PRIMARY KEY ("id"))`
    )
    await queryRunner.query(
      `ALTER TABLE "teaches" ADD CONSTRAINT "FK_002e08507b622fdd60286fd843b" FOREIGN KEY ("teacher_id") REFERENCES "teacher"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
    await queryRunner.query(
      `ALTER TABLE "teaches" ADD CONSTRAINT "FK_4994b663fd6a9dc3e0a7780531f" FOREIGN KEY ("student_id") REFERENCES "student"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "teaches" DROP CONSTRAINT "FK_4994b663fd6a9dc3e0a7780531f"`)
    await queryRunner.query(`ALTER TABLE "teaches" DROP CONSTRAINT "FK_002e08507b622fdd60286fd843b"`)
    await queryRunner.query(`DROP TABLE "teaches"`)
  }
}
