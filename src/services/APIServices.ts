import { Err } from '@aelesia/commons'
import { NotImplementedErr } from '@aelesia/commons/dist/src/error/Error'
import { createQueryBuilder, getConnection, getManager, In } from 'typeorm'

import { Student } from '../../db/entity/Student'
import { Suspension } from '../../db/entity/Suspension'
import { Teacher } from '../../db/entity/Teacher'
import { Teaches } from '../../db/entity/Teaches'
import { Students, Suspensions, Teachers, TeachesRepo } from '../../db/repository/Repository'

export async function registerStudentsToTeacher(students: Student[], teacher: Teacher): Promise<void> {
  const teaches = students.map(
    (student) =>
      new Teaches({
        student,
        teacher,
      })
  )
  await TeachesRepo.save(teaches)
}

export async function suspendStudent(student: Student): Promise<void> {
  if (await student.isSuspended()) {
    throw new Err.IllegalArgumentErr('Student is already suspended')
  }

  await Suspensions.save(
    new Suspension({
      student,
      active: true,
    })
  )
}

export async function commonStudents(teachers: Teacher[]): Promise<Student[]> {
  const ids = teachers.map((it) => it.id)
  const student_ids: { student_id: number }[] = await createQueryBuilder()
    .select(['t.student_id'])
    .from(Teaches, 't')
    .where('t.teacher_id in (:...ids)', { ids })
    .groupBy('t.student_id')
    .having('count(*) = :count', { count: ids.length })
    .execute()

  const students: any[] = await createQueryBuilder()
    .select()
    .from(Student, '')
    .where('id in (:...ids)', { ids: student_ids.map((it) => it.student_id) })
    .execute()

  return students.map((it) => new Student(it))
}

export async function findStudentsByTeacherEmail(email: string): Promise<Student[]> {
  return Teachers.findOneOrFail({ where: { email } })
    .then((t) => t.teaches)
    .then((t) => Promise.all(t.map((it) => it.student)))
}
