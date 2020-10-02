import 'reflect-metadata'

import { Arr, Rand } from '@aelesia/commons'
import { createConnection } from 'typeorm'

import { StudentFactory, TeacherFactory } from '../factories/Factories'
import { Student } from './entity/Student'
import { Teacher } from './entity/Teacher'
import { Teaches } from './entity/Teaches'

createConnection()
  .then(async (connection) => {
    const students = StudentFactory.array(100).map((it) => new Student(it))
    for (const student of students) {
      await connection.manager.save(student)
    }

    const teachers = TeacherFactory.array(10).map((it) => new Teacher(it))
    for (const teacher of teachers) {
      await connection.manager.save(teacher)
    }

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
  })
  .catch((error) => console.log(error))
