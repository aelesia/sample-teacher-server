import { Student } from '../../db/entity/Student'
import { Teacher } from '../../db/entity/Teacher'
import { Teaches } from '../../db/entity/Teaches'
import { TeachesRepo } from '../../db/repository/Repository'

export async function registerStudentsToTeacher(students: Student[], teacher: Teacher) {
  const teaches = students.map(
    (student) =>
      new Teaches({
        student,
        teacher,
      })
  )
  await TeachesRepo.save(teaches)
}
