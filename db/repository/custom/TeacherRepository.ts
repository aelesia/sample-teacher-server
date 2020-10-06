import { EntityRepository, Repository } from 'typeorm'

import { Student } from '../../entity/Student'
import { Teacher } from '../../entity/Teacher'
import { In } from '../../Wrapper'
import { Teachers } from '../Repository'

@EntityRepository(Teacher)
export class TeacherRepository extends Repository<Teacher> {
  async findStudents(email: string): Promise<Student[]> {
    return Teachers.findOneOrFail({ where: { email } })
      .then((t) => t.teaches)
      .then((t) => Promise.all(t.map((it) => it.student)))
  }
}
