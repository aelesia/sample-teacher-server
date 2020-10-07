import { EntityRepository, Repository } from 'typeorm'
import { EntityNotFoundError } from 'typeorm/error/EntityNotFoundError'

import { EntityOneOrMoreNotFoundError } from '../../../src/errors/Error'
import { Student } from '../../entity/Student'
import { In } from '../../Wrapper'

@EntityRepository(Student)
export class StudentRepository extends Repository<Student> {
  async findInEmail(email: string[]): Promise<Student[]> {
    return this.find({ where: { email: In(email) } })
  }
  async findInEmailOrFail(email: string[]): Promise<Student[]> {
    const students = await this.findInEmail(email)
    if (students.length < email.length) {
      throw new EntityOneOrMoreNotFoundError(
        Student,
        `Expected ${email.length} results, but only found ${students.length}: [${students.map((it) => it.email)}]`
      )
    }
    return students
  }
}
