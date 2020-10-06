import { EntityRepository, Repository } from 'typeorm'

import { Student } from '../../entity/Student'
import { In } from '../../Wrapper'

@EntityRepository(Student)
export class StudentRepository extends Repository<Student> {
  async findInEmail(email: string[]): Promise<Student[]> {
    return this.find({ where: { email: In(email) } })
  }
}
