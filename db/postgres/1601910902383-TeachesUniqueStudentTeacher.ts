import { MigrationInterface, QueryRunner } from 'typeorm'

export class TeachesUniqueStudentTeacher1601910902383 implements MigrationInterface {
  name = 'TeachesUniqueStudentTeacher1601910902383'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_12c94a3dcf2f0d1c707f5192ee" ON "teaches" ("teacher_id", "student_id") `
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX "IDX_12c94a3dcf2f0d1c707f5192ee"`)
  }
}
