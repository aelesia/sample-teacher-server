import { EntityRepository, Repository } from 'typeorm'

import { IllegalActionError } from '../../../src/errors/Error'
import { Student } from '../../entity/Student'
import { Teacher } from '../../entity/Teacher'
import { Teaches } from '../../entity/Teaches'
import { isDuplicateEntryError } from '../../wrappers/ErrorWrapper'

@EntityRepository(Teaches)
export class TeachesRepository extends Repository<Teaches> {
  registerStudentsToTeachers(students: Student[], teacher: Teacher): Promise<Teaches[]> {
    const teaches = students.map(
      (student) =>
        new Teaches({
          student,
          teacher,
        })
    )
    return this.save(teaches).catch((err: Error) => {
      if (isDuplicateEntryError(err)) {
        throw new IllegalActionError('One or more students is already registered to this teacher')
      }
      throw err
    })
  }
}
