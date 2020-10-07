import { CreateDateColumn, Entity, Index, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

import { BaseEntity } from '../BaseEntity'
import { Student } from './Student'
import { Teacher } from './Teacher'

@Entity()
@Index(['teacher', 'student'], { unique: true })
export class Teaches extends BaseEntity<Teaches> {
  @PrimaryGeneratedColumn('increment')
  id!: number

  @ManyToOne((type) => Teacher, (teacher) => teacher.teaches)
  teacher!: Promise<Teacher>

  @ManyToOne((type) => Student, (student) => student.teaches_by)
  student!: Promise<Student>

  @CreateDateColumn()
  created_date!: Date

  @UpdateDateColumn()
  updated_date!: Date
}
