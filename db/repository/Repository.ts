import { createConnection, getCustomRepository, getRepository, Repository } from 'typeorm'

import { Suspension } from '../entity/Suspension'
import { StudentRepository } from './custom/StudentRepository'
import { TeacherRepository } from './custom/TeacherRepository'
import { TeachesRepository } from './custom/TeachesRepository'
import { UninitiatedRepository } from './UninitializedRepository'

export let Students: StudentRepository = new UninitiatedRepository() as any
export let Teachers: TeacherRepository = new UninitiatedRepository() as any
export let TeachesRepo: TeachesRepository = new UninitiatedRepository() as any
export let Suspensions: Repository<Suspension> = new UninitiatedRepository()

export async function initRepositories(): Promise<void> {
  await createConnection()
  Students = getCustomRepository(StudentRepository)
  Teachers = getCustomRepository(TeacherRepository)
  TeachesRepo = getCustomRepository(TeachesRepository)
  Suspensions = getRepository(Suspension)
}
