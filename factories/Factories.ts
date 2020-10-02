import { FakerFactory } from '@aelesia/commons'
import Faker from 'faker'

import { Student } from '../db/entity/Student'
import { Teacher } from '../db/entity/Teacher'

export const StudentFactory = new FakerFactory(
  (): Student => {
    const date = Faker.date.past(1)
    return {
      email: Faker.internet.email(),
      first_name: Faker.name.firstName(),
      id: Faker.random.number(9999999),
      last_name: Faker.name.lastName(),
      created_date: date,
      updated_date: date,
      uuid: Faker.random.uuid(),
      teaches_by: undefined as any,
    }
  }
)

export const TeacherFactory = new FakerFactory(
  (): Teacher => {
    const date = Faker.date.past(1)
    return {
      email: Faker.internet.email(),
      first_name: Faker.name.firstName(),
      id: Faker.random.number(9999999),
      last_name: Faker.name.lastName(),
      created_date: date,
      updated_date: date,
      uuid: Faker.random.uuid(),
      teaches: undefined as any,
    }
  }
)
