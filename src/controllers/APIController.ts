import { Throw } from '@aelesia/commons'
import { createConnection, getRepository, In } from 'typeorm'

import { Student } from '../../db/entity/Student'
import { Suspension } from '../../db/entity/Suspension'
import { Teaches } from '../../db/entity/Teaches'
import { Students, Suspensions, Teachers, TeachesRepo } from '../../db/repository/Repository'
import { router } from '../app/config/Spring'
import { _200_OKAY, _204_NO_CONTENT } from '../consts/StatusCodes'
import { registerStudentsToTeacher, suspendStudent } from '../services/APIServices'
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
  teachers: string[]
}
router.get('/api/commonstudents', async (ctx) => {
  const body: Request = ctx.params

  ctx.status = _204_NO_CONTENT
})

router.post('/api/suspend', async (ctx) => {
  const body: { student: string } = ctx.request.body

  const student = await Students.findOneOrFail({ where: { email: body.student } })
  await suspendStudent(student)

  ctx.status = _204_NO_CONTENT
})
