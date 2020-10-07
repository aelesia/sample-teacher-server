import { createQueryBuilder } from 'typeorm'

import { Student } from '../../db/entity/Student'
import { Suspension } from '../../db/entity/Suspension'
import { Teacher } from '../../db/entity/Teacher'
import { Teaches } from '../../db/entity/Teaches'
import { Students, Suspensions, Teachers, TeachesRepo } from '../../db/repository/Repository'
import { IllegalActionError } from '../errors/Error'

export async function suspendStudent(student: Student): Promise<void> {
  if (await student.isSuspended()) {
    throw new IllegalActionError('Student is already suspended')
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
