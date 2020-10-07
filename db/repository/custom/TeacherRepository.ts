import { EntityRepository, Repository } from 'typeorm'

import { EntityOneOrMoreNotFoundError } from '../../../src/errors/Error'
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

  async findInEmail(email: string[]): Promise<Teacher[]> {
    return this.find({ where: { email: In(email) } })
  }
  async findInEmailOrFail(email: string[]): Promise<Teacher[]> {
    const teachers = await this.findInEmail(email)
    if (teachers.length < email.length) {
      throw new EntityOneOrMoreNotFoundError(
        Teacher,
        `Expected ${email.length} results, but only found ${teachers.length}: [${teachers.map((it) => it.email)}]`
      )
    }
    return teachers
  }
}
