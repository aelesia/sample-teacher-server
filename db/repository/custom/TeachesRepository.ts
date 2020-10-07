import { EntityRepository, Repository } from 'typeorm'

import { IllegalActionError } from '../../../src/errors/Error'
import { Student } from '../../entity/Student'
import { Teacher } from '../../entity/Teacher'
import { Teaches } from '../../entity/Teaches'

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
      if (err.name === 'QueryFailedError' && err.message.includes('duplicate key value violates unique constraint')) {
        throw new IllegalActionError('One or more students is already registered to this teacher')
      }
      throw err
    })
  }
}
