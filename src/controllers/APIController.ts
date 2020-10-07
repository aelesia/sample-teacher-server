import lodash from 'lodash'

import { Student } from '../../db/entity/Student'
import { Students, Suspensions, Teachers, TeachesRepo } from '../../db/repository/Repository'
import { In } from '../../db/Wrapper'
import { router } from '../app/config/Spring'
import { _200_OKAY, _204_NO_CONTENT } from '../consts/StatusCodes'
import { commonStudents, suspendStudent } from '../services/APIServices'
import { extractMentionedEmails } from '../utils/Util'

export type CreateStudent = Pick<Student, 'first_name' | 'last_name' | 'email'>
export type StudentResponse = Omit<Student, 'id' | 'created_date' | 'updated_date' | 'teaches_by'>

type Request = {
  teacher: string
  students: string[]
}
router.post('/api/register', async (ctx) => {
  const body: Request = ctx.request.body

  const teacher = await Teachers.findOneOrFail({ where: { email: body.teacher } })
  const students = await Students.findInEmailOrFail(body.students)
  await TeachesRepo.registerStudentsToTeachers(students, teacher)

  ctx.status = _204_NO_CONTENT
})

type Request2 = {
  teachers: string | string[]
}
router.get('/api/commonstudents', async (ctx) => {
  const body: Request2 = ctx.query
  const emails = typeof body.teachers === 'string' ? [body.teachers] : body.teachers

  const teachers = await Teachers.findInEmailOrFail(emails)
  const common = await commonStudents(teachers)

  ctx.status = _200_OKAY
  ctx.body = {
    students: common.map((it) => it.email),
  }
})

router.post('/api/suspend', async (ctx) => {
  const body: { student: string } = ctx.request.body

  const student = await Students.findOneOrFail({ where: { email: body.student } })
  await suspendStudent(student)

  ctx.status = _204_NO_CONTENT
})

router.post('/api/retrievefornotifications', async (ctx) => {
  const req: { teacher: string; notification: string } = ctx.request.body

  const teacherStudents = await Teachers.findStudents(req.teacher)
  const mentionedStudents = await Students.findInEmail(extractMentionedEmails(req.notification))
  const allStudents = lodash.uniqBy([...teacherStudents, ...mentionedStudents], 'id')

  const suspended = await Suspensions.find({ where: { student: In(allStudents.map((it) => it.id)), active: true } })
  const suspendedStudents = suspended.map((it) => it.student)

  const whitelistStudents = allStudents.filter((it) => !suspendedStudents.some((s) => s.id === it.id))

  ctx.status = _200_OKAY
  ctx.body = {
    recipients: whitelistStudents.map((it) => it.email),
  }
})
