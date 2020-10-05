import { Err } from '@aelesia/commons'

import { Student } from '../../db/entity/Student'
import { Suspension } from '../../db/entity/Suspension'
import { Teacher } from '../../db/entity/Teacher'
import { Teaches } from '../../db/entity/Teaches'
import { Suspensions, TeachesRepo } from '../../db/repository/Repository'

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
