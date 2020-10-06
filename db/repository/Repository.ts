import { UninitializedErr } from '@aelesia/commons/dist/src/error/Error'
import {
  createConnection,
  DeepPartial,
  getConnection,
  getCustomRepository,
  getRepository,
  QueryRunner,
  Repository,
  SelectQueryBuilder,
} from 'typeorm'

import { Student } from '../entity/Student'
import { Suspension } from '../entity/Suspension'
import { Teacher } from '../entity/Teacher'
import { Teaches } from '../entity/Teaches'
import { StudentRepository } from './custom/StudentRepository'
import { TeacherRepository } from './custom/TeacherRepository'
import { UninitiatedRepository } from './UninitializedRepository'

export let Students: StudentRepository = new UninitiatedRepository() as any
export let Teachers: TeacherRepository = new UninitiatedRepository() as any
export let TeachesRepo: Repository<Teaches> = new UninitiatedRepository()
export let Suspensions: Repository<Suspension> = new UninitiatedRepository()

export async function initRepositories(): Promise<void> {
  await createConnection()
  Students = getCustomRepository(StudentRepository)
  Teachers = getCustomRepository(TeacherRepository)
  TeachesRepo = getRepository(Teaches)
  Suspensions = getRepository(Suspension)
}
