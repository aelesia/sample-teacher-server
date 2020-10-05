import { UninitializedErr } from '@aelesia/commons/dist/src/error/Error'
import {
  createConnection,
  DeepPartial,
  getConnection,
  getRepository,
  QueryRunner,
  Repository,
  SelectQueryBuilder,
} from 'typeorm'

import { Student } from '../entity/Student'
import { Teacher } from '../entity/Teacher'
import { Teaches } from '../entity/Teaches'
import { UninitiatedRepository } from './UninitializedRepository'

export let Students: Repository<Student> = new UninitiatedRepository()
export let Teachers: Repository<Teacher> = new UninitiatedRepository()
export let TeachesRepo: Repository<Teaches> = new UninitiatedRepository()

export async function initRepositories(): Promise<void> {
  await createConnection()
  Students = getRepository(Student)
  Teachers = getRepository(Teacher)
  TeachesRepo = getRepository(Teaches)
}
