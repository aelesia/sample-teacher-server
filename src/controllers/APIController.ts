import { Err, Throw } from '@aelesia/commons'
import { createConnection, getRepository } from 'typeorm'

import { Student } from '../../db/entity/Student'
import { Suspension } from '../../db/entity/Suspension'
import { Teaches } from '../../db/entity/Teaches'
import { Students, Suspensions, Teachers, TeachesRepo } from '../../db/repository/Repository'
import { In } from '../../db/Wrapper'
import { router } from '../app/config/Spring'
import { _200_OKAY, _204_NO_CONTENT } from '../consts/StatusCodes'
import {
  commonStudents,
  findStudentsByTeacherEmail,
  registerStudentsToTeacher,
  suspendStudent,
} from '../services/APIServices'
import { extractStudentEmailsFromNotifications } from '../utils/Util'
import { validateStudent } from '../validators/Validators'

export type CreateStudent = Pick<Student, 'first_name' | 'last_name' | 'email'>
export type StudentResponse = Omit<Student, 'id' | 'created_date' | 'updated_date' | 'teaches_by'>

type Request = {
  teacher: string
  students: string[]
}
router.post('/api/register', async (ctx) => {
  const body: Request = ctx.request.body

  const teacher = await Teachers.findOneOrFail({ where: { email: body.teacher } })
  const students = await Students.find({ where: { email: In(body.students) } })
  await registerStudentsToTeacher(students, teacher)

  ctx.status = _204_NO_CONTENT
})

type Request2 = {
  teachers: string | string[]
}
router.get('/api/commonstudents', async (ctx) => {
  const body: Request2 = ctx.query
  const emails = typeof body.teachers === 'string' ? [body.teachers] : body.teachers

  const [teachers, count] = await Teachers.findAndCount({ where: { email: In(emails) } })
  if (count < emails.length) {
    throw Error('One or more TeacherIDs is invalid')
  }
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
  const body: { teacher: string; notification: string } = ctx.request.body

  console.log(await Students.find({ where: { email: In([null]) } }))

  const teacherStudents = await findStudentsByTeacherEmail(body.teacher)
  const mentionedStudents = await Students.find({
    where: { email: In(extractStudentEmailsFromNotifications(body.notification)) },
  })
  const allStudents = [...teacherStudents, ...mentionedStudents]
  const suspended = await Suspensions.find({ where: { student: In(allStudents.map((it) => it.id)), active: true } })
  const suspendedStudents = suspended.map((it) => it.student)

  const whitelistStudents = allStudents.filter((it) => !suspendedStudents.some((s) => s.id === it.id))

  ctx.status = _200_OKAY
  ctx.body = {
    recipients: whitelistStudents,
  }
})
