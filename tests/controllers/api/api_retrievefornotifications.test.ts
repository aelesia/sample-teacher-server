import request from 'supertest'
import { initialiseTestTransactions, runInTransaction } from 'typeorm-test-transactions'

import { Student } from '../../../db/entity/Student'
import { Teacher } from '../../../db/entity/Teacher'
import { Teaches } from '../../../db/entity/Teaches'
import { initRepositories, Students, Suspensions, Teachers, TeachesRepo } from '../../../db/repository/Repository'
import { StudentFactory, TeacherFactory } from '../../../factories/Factories'
import { app } from '../../../src/app/config/Spring'
import { _200_OKAY, _400_CLIENT_ERROR } from '../../../src/consts/StatusCodes'

/**
 * - Note, if test fails due to duplicate key, please ensure that DB is empty before running
 * - Possible improper teardown of DB connection
 */
describe('APIController', () => {
  beforeAll(async () => {
    initialiseTestTransactions()
    await initRepositories()
  })

  let student_bob: Student
  let student_agnes: Student
  let student_miche: Student
  let teacher_ken: Teacher
  let teacher_joe: Teacher
  let teaches1: Teaches[]
  let teaches2: Teaches[]

  beforeEach(async () => {
    student_bob = await Students.save(new Student(StudentFactory.new({ email: 'studentbob@gmail.com' })))
    student_agnes = await Students.save(new Student(StudentFactory.new({ email: 'studentagnes@gmail.com' })))
    student_miche = await Students.save(new Student(StudentFactory.new({ email: 'studentmiche@gmail.com' })))
    teacher_ken = await Teachers.save(new Teacher(TeacherFactory.new({ email: 'teacherken2@gmail.com' })))
    teacher_joe = await Teachers.save(new Teacher(TeacherFactory.new({ email: 'teacherjoe2@gmail.com' })))
    teaches1 = await TeachesRepo.registerStudentsToTeachers([student_bob], teacher_ken)
    teaches2 = await TeachesRepo.registerStudentsToTeachers([student_agnes, student_miche], teacher_joe)
  })

  afterEach(async () => {
    await TeachesRepo.delete(teaches1.map((it) => it.id))
    await TeachesRepo.delete(teaches2.map((it) => it.id))
    await Students.delete([student_bob, student_agnes, student_miche].map((it) => it.id))
    await Teachers.delete([teacher_ken, teacher_joe].map((it) => it.id))
  })

  describe('/api/retrievefornotifications', () => {
    test('retrieves 1 students under teacher ken', async () => {
      const response = await request(app.callback()).post('/api/retrievefornotifications').send({
        teacher: teacher_ken.email,
        notification: 'Hey everybody',
      })
      expect(response.status).toBe(_200_OKAY)
      expect(response.body.recipients).toBeInstanceOf(Array)
      expect(response.body.recipients).toHaveLength(1)
      expect(response.body.recipients).toContain(student_bob.email)
    })

    test('retrieves 2 students under teacher joe', async () => {
      const response = await request(app.callback()).post('/api/retrievefornotifications').send({
        teacher: teacher_joe.email,
        notification: 'Hey everybody',
      })
      expect(response.status).toBe(_200_OKAY)
      expect(response.body.recipients).toBeInstanceOf(Array)
      expect(response.body.recipients).toHaveLength(2)
      expect(response.body.recipients).toContain(student_agnes.email)
      expect(response.body.recipients).toContain(student_miche.email)
    })

    test('retrieves 3 students under teacher ken + mention', async () => {
      const response = await request(app.callback())
        .post('/api/retrievefornotifications')
        .send({
          teacher: teacher_ken.email,
          notification: `Hey everybody @${student_miche.email} @${student_agnes.email}`,
        })
      expect(response.status).toBe(_200_OKAY)
      expect(response.body.recipients).toBeInstanceOf(Array)
      expect(response.body.recipients).toHaveLength(3)
      expect(response.body.recipients).toContain(student_bob.email)
      expect(response.body.recipients).toContain(student_agnes.email)
      expect(response.body.recipients).toContain(student_miche.email)
    })

    test('incorrect teacher email', async () => {
      const response = await request(app.callback())
        .post('/api/retrievefornotifications')
        .send({
          teacher: 'wrong@email.com',
          notification: `Hey everybody @${student_miche.email} @${student_agnes.email}`,
        })
      expect(response.status).toBe(_400_CLIENT_ERROR)
      expect(response.body.error).not.toBeNull()
      expect(response.body.error.name).toEqual('EntityNotFound')
      expect(response.body.error.message).not.toBeNull()
    })

    test('still only 2 students on teacher joe despite mentioning his own students', async () => {
      const response = await request(app.callback())
        .post('/api/retrievefornotifications')
        .send({
          teacher: teacher_joe.email,
          notification: `Hey everybody @${student_miche.email}`,
        })
      expect(response.status).toBe(_200_OKAY)
      expect(response.body.recipients).toBeInstanceOf(Array)
      expect(response.body.recipients).toHaveLength(2)
      expect(response.body.recipients).toContain(student_agnes.email)
      expect(response.body.recipients).toContain(student_miche.email)
    })

    test(
      'retrieve 2 students bob suspended',
      runInTransaction(async () => {
        await Suspensions.save({ student: student_bob, active: true })

        const response = await request(app.callback())
          .post('/api/retrievefornotifications')
          .send({
            teacher: teacher_ken.email,
            notification: `Hey everybody @${student_miche.email} @${student_agnes.email}`,
          })
        expect(response.status).toBe(_200_OKAY)
        expect(response.body.recipients).toBeInstanceOf(Array)
        expect(response.body.recipients).toHaveLength(2)
        expect(response.body.recipients).toContain(student_agnes.email)
        expect(response.body.recipients).toContain(student_miche.email)
      })
    )

    test(
      'retrieve 1 student bob & agnes suspended',
      runInTransaction(async () => {
        await Suspensions.save({ student: student_bob, active: true })
        await Suspensions.save({ student: student_agnes, active: true })

        const response = await request(app.callback())
          .post('/api/retrievefornotifications')
          .send({
            teacher: teacher_ken.email,
            notification: `Hey everybody @${student_miche.email} @${student_agnes.email}`,
          })
        expect(response.status).toBe(_200_OKAY)
        expect(response.body.recipients).toBeInstanceOf(Array)
        expect(response.body.recipients).toHaveLength(1)
        expect(response.body.recipients).toContain(student_miche.email)
      })
    )
  })
})
