import request from 'supertest'
import { initialiseTestTransactions, runInTransaction } from 'typeorm-test-transactions'

import { Student } from '../../../db/entity/Student'
import { Teacher } from '../../../db/entity/Teacher'
import { Teaches } from '../../../db/entity/Teaches'
import { initRepositories, Students, Teachers, TeachesRepo } from '../../../db/repository/Repository'
import { StudentFactory, TeacherFactory } from '../../../factories/Factories'
import { app } from '../../../src/app/config/Spring'
import { _204_NO_CONTENT, _400_CLIENT_ERROR, _409_CONFLICT } from '../../../src/consts/StatusCodes'

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
        expect(response.status).toBe(_204_NO_CONTENT)
      })
    )

    test(
      'it should throw a 400 error due to invalid teacher',
      runInTransaction(async () => {
        await Students.save(students)

        const response = await request(app.callback())
          .post('/api/register')
          .send({
            teacher: teacher.email,
            students: students.map((it) => it.email),
          })
        expect(response.status).toEqual(_400_CLIENT_ERROR)
        expect(response.body.message).not.toBeNull()
        expect(response.body.message).toContain('EntityNotFound')
      })
    )

    test(
      'it should throw a 400 error due to no students found',
      runInTransaction(async () => {
        await Teachers.save(teacher)

        const response = await request(app.callback())
          .post('/api/register')
          .send({
            teacher: teacher.email,
            students: students.map((it) => it.email),
          })
        expect(response.status).toEqual(_400_CLIENT_ERROR)
        expect(response.body.message).not.toBeNull()
        expect(response.body.message).toContain('EntityOneOrMoreNotFoundError')
      })
    )

    test(
      'it should throw a 400 error due to some students not found',
      runInTransaction(async () => {
        await Teachers.save(teacher)
        await Students.save(students[1])
        await Students.save(students[2])

        const response = await request(app.callback())
          .post('/api/register')
          .send({
            teacher: teacher.email,
            students: students.map((it) => it.email),
          })
        expect(response.status).toEqual(_400_CLIENT_ERROR)
        expect(response.body.message).not.toBeNull()
        expect(response.body.message).toContain('EntityOneOrMoreNotFoundError')
      })
    )

    test(
      'it should throw a 409 error due to student already being registered',
      runInTransaction(async () => {
        await Teachers.save(teacher)
        await Students.save(students)
        await TeachesRepo.save(
          new Teaches({
            student: students[0],
            teacher: teacher,
          })
        )

        const response = await request(app.callback())
          .post('/api/register')
          .send({
            teacher: teacher.email,
            students: students.map((it) => it.email),
          })
        expect(response.status).toBe(_409_CONFLICT)
        expect(response.body.message).not.toBeNull()
        expect(response.body.message).toContain('IllegalActionError')
      })
    )
  })
})
