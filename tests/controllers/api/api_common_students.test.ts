import request from 'supertest'
import { initialiseTestTransactions } from 'typeorm-test-transactions'

import { Student } from '../../../db/entity/Student'
import { Teacher } from '../../../db/entity/Teacher'
import { Teaches } from '../../../db/entity/Teaches'
import { initRepositories, Students, Teachers, TeachesRepo } from '../../../db/repository/Repository'
import { StudentFactory, TeacherFactory } from '../../../factories/Factories'
import { app } from '../../../src/app/config/Spring'
import { _200_OKAY, _400_CLIENT_ERROR } from '../../../src/consts/StatusCodes'

/**
 * Note, if test fails due to duplicate key, please ensure that DB is empty before running
 * For some reason, runInTransaction does not work properly
 * Suspect it's because it calls customQueryBuilder
 */
describe('/api/commonstudents', () => {
  beforeAll(async () => {
    initialiseTestTransactions()
    await initRepositories()
  })

  let common_student1: Student
  let common_student2: Student
  let ken_student: Student
  let teacher_ken: Teacher
  let teacher_joe: Teacher
  let teaches1: Teaches[]
  let teaches2: Teaches[]

  beforeEach(async () => {
    common_student1 = await Students.save(new Student(StudentFactory.new({ email: 'commonstudent1@gmail.com' })))
    common_student2 = await Students.save(new Student(StudentFactory.new({ email: 'commonstudent2@gmail.com' })))
    ken_student = await Students.save(
      new Student(StudentFactory.new({ email: 'student_only_under_teacher_ken@gmail.com' }))
    )
    teacher_ken = await Teachers.save(new Teacher(TeacherFactory.new({ email: 'teacherken@gmail.com' })))
    teacher_joe = await Teachers.save(new Teacher(TeacherFactory.new({ email: 'teacherjoe@gmail.com' })))
    teaches1 = await TeachesRepo.registerStudentsToTeachers(
      [common_student1, common_student2, ken_student],
      teacher_ken
    )
    teaches2 = await TeachesRepo.registerStudentsToTeachers([common_student1, common_student2], teacher_joe)
  })

  afterEach(async () => {
    await TeachesRepo.delete(teaches1.map((it) => it.id))
    await TeachesRepo.delete(teaches2.map((it) => it.id))
    await Students.delete([common_student1, common_student2, ken_student].map((it) => it.id))
    await Teachers.delete([teacher_ken, teacher_joe].map((it) => it.id))
  })

  test('should return 3 students under teacher ken', async () => {
    const response = await request(app.callback()).get('/api/commonstudents?teacher=teacherken@gmail.com')
    expect(response.status).toBe(_200_OKAY)
    expect(response.body.students).toBeInstanceOf(Array)
    expect(response.body.students).toHaveLength(3)
    expect(response.body.students).toContain('commonstudent1@gmail.com')
    expect(response.body.students).toContain('commonstudent2@gmail.com')
    expect(response.body.students).toContain('student_only_under_teacher_ken@gmail.com')
  })

  test('should return 2 students under teacher joe', async () => {
    const response = await request(app.callback()).get('/api/commonstudents?teacher=teacherjoe@gmail.com')
    expect(response.status).toBe(_200_OKAY)
    expect(response.body.students).toBeInstanceOf(Array)
    expect(response.body.students).toHaveLength(2)
    expect(response.body.students).toContain('commonstudent1@gmail.com')
    expect(response.body.students).toContain('commonstudent2@gmail.com')
  })

  test('should return 2 students under teacher joe & ken', async () => {
    const response = await request(app.callback()).get(
      '/api/commonstudents?teacher=teacherjoe@gmail.com&teacher=teacherken@gmail.com'
    )
    expect(response.status).toBe(_200_OKAY)
    expect(response.body.students).toBeInstanceOf(Array)
    expect(response.body.students).toHaveLength(2)
    expect(response.body.students).toContain('commonstudent1@gmail.com')
    expect(response.body.students).toContain('commonstudent2@gmail.com')
  })

  test('incorrect teacher email', async () => {
    const response = await request(app.callback()).get('/api/commonstudents?teacher=wrong@email.com')
    expect(response.status).toBe(_400_CLIENT_ERROR)
    expect(response.body.message).not.toBeNull()
    expect(response.body.message).toContain('EntityOneOrMoreNotFoundError')
  })
})
