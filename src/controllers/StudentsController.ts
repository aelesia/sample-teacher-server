import { Throw } from '@aelesia/commons'
import { createConnection, getRepository } from 'typeorm'

import { Student } from '../../db/entity/Student'
import { Students } from '../../db/repository/Repository'
import { router } from '../app/config/Spring'
import { _200_OKAY, _204_NO_CONTENT } from '../consts/StatusCodes'
import { validateStudent } from '../validators/Validators'

export type CreateStudent = Pick<Student, 'first_name' | 'last_name' | 'email'>
export type StudentResponse = Omit<Student, 'id' | 'created_date' | 'updated_date' | 'teaches_by'>

type students_id_request = {
  id: string
}
type students_id_response = StudentResponse

router.get('/students/:uuid', async (ctx) => {
  const uuid = ctx.params['uuid']
  const student = await Students.findOneOrFail({ where: { uuid } })
  ctx.body = {
    uuid: student.uuid,
    email: student.email,
    first_name: student.first_name,
    last_name: student.last_name,
  }
  ctx.status = _200_OKAY
})

router.post('/students/register', async (ctx) => {
  const body = ctx.request.body
  if (!validateStudent(body)) {
    throw TypeError()
  }
  const newStudent = Students.create(body)
  ctx.status = _200_OKAY
  ctx.body = newStudent
})
