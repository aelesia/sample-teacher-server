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
  let commonStudents2 = await Promise.all((await teachers[0].teaches).map(async (it) => await it.student))
  console.log(commonStudents2)
  for (const teacher of teachers) {
    const teacherStudents = await Promise.all((await teacher.teaches).map(async (it) => await it.student))
    commonStudents2 = commonStudents2.filter((it) => {
      return teacherStudents.some((it2) => it2.id === it.id)
    })
  }

  return commonStudents2
}

export async function retrieveNonSuspendedStudents(teacher: Teacher): Promise<Student[]> {
  const students = (await teacher.teaches).map((it) => it.student)
  const nonSuspendedStudents = (await Suspensions.find({ where: { student: In(students), active: true } })).map(
    (it) => it.student
  )
  students.filter((it) => nonSuspendedStudents.some((it2) => it.id !== it2.id))
  throw new NotImplementedErr()
}
