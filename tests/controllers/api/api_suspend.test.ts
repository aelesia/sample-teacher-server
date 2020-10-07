import request from 'supertest'
import { initialiseTestTransactions, runInTransaction } from 'typeorm-test-transactions'

import { Student } from '../../../db/entity/Student'
import { Suspension } from '../../../db/entity/Suspension'
import { initRepositories, Students, Suspensions } from '../../../db/repository/Repository'
import { StudentFactory } from '../../../factories/Factories'
import { app } from '../../../src/app/config/Spring'
import { _204_NO_CONTENT, _400_CLIENT_ERROR, _409_CONFLICT } from '../../../src/consts/StatusCodes'

describe('/api/suspend', () => {
  beforeAll(async () => {
    initialiseTestTransactions()
    await initRepositories()
  })
  const student = new Student(StudentFactory.new())

  test(
    'should be able to suspend student',
    runInTransaction(async () => {
      await Students.save(student)

      const response = await request(app.callback()).post('/api/suspend').send({
        student: student.email,
      })
      expect(response.status).toBe(_204_NO_CONTENT)
    })
  )

  test(
    'should throw 400 error due to no student found',
    runInTransaction(async () => {
      await Students.save(student)

      const response = await request(app.callback()).post('/api/suspend').send({
        student: 'something@somewhere.com',
      })
      expect(response.status).toBe(_400_CLIENT_ERROR)
      expect(response.body.error).not.toBeNull()
      expect(response.body.error.name).toEqual('EntityNotFound')
      expect(response.body.error.message).not.toBeNull()
      console.info(response.body.error.message)
    })
  )

  test(
    'should throw 409 error due to student already being suspended',
    runInTransaction(async () => {
      await Students.save(student)
      await Suspensions.save(
        new Suspension({
          student: student,
          active: true,
        })
      )

      const response = await request(app.callback()).post('/api/suspend').send({
        student: student.email,
      })
      expect(response.status).toBe(_409_CONFLICT)
      expect(response.body.error).not.toBeNull()
      expect(response.body.error.name).toEqual('IllegalActionError')
      expect(response.body.error.message).not.toBeNull()
      console.info(response.body.error.message)
    })
  )

  test(
    'should be able to suspend student as previous suspension is no longer active',
    runInTransaction(async () => {
      await Students.save(student)
      await Suspensions.save(
        new Suspension({
          student: student,
          active: false,
        })
      )

      const response = await request(app.callback()).post('/api/suspend').send({
        student: student.email,
      })
      expect(response.status).toBe(_204_NO_CONTENT)
    })
  )
})
