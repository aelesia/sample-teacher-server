import 'reflect-metadata'

import { Rand } from '@aelesia/commons'
import { createConnection } from 'typeorm'

import { StudentFactory, TeacherFactory } from '../factories/Factories'
import { Student } from './entity/Student'
import { Suspension } from './entity/Suspension'
import { Teacher } from './entity/Teacher'
import { Teaches } from './entity/Teaches'

createConnection()
  .then(async (connection) => {
    const students = StudentFactory.array(50).map((it) => new Student(it))
    for (const student of students) {
      await connection.manager.save(student)
    }
    console.info(`Created ${students.length} students`)

    const teachers = TeacherFactory.array(5).map((it) => new Teacher(it))
    for (const teacher of teachers) {
      await connection.manager.save(teacher)
    }
    console.info(`Created ${teachers.length} teachers`)

    for (const student of students) {
      for (const teacher of teachers) {
        if (Rand.chance(50)) {
          await connection.manager.save(
            new Teaches({
              student,
              teacher,
            })
          )
        }
      }
    }
    console.info(`Created student / teacher relationships`)

    for (const student of students) {
      if (Rand.chance(10)) {
        await connection.manager.save(
          new Suspension({
            student,
            active: true,
          })
        )
      }
    }
    console.info(`Suspended students`)
  })
  .catch((error) => console.error(error))
