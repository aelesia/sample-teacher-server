import request from 'supertest'
import { initialiseTestTransactions, runInTransaction } from 'typeorm-test-transactions'

import { Student } from '../../db/entity/Student'
import { Teacher } from '../../db/entity/Teacher'
import { initRepositories, Students, Teachers } from '../../db/repository/Repository'
import { StudentFactory, TeacherFactory } from '../../factories/Factories'
import { app } from '../../src/app/config/Spring'

describe('APIController', () => {
  beforeAll(async () => {
    initialiseTestTransactions()
    await initRepositories()
  })

  describe('/api/register', () => {
    const students = StudentFactory.array(3).map((it) => new Student(it))
    const teacher = new Teacher(TeacherFactory.new())

    test(
      'it should be able to register',
      runInTransaction(async () => {
        await Teachers.save(teacher)
        await Students.save(students)

        const response = await request(app.callback())
          .post('/api/register')
          .send({
            teacher: teacher.email,
            students: students.map((it) => it.email),
          })
        expect(response.status).toBe(204)
      })
    )
  })
})
