import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

import { Student } from './Student'
import { Teacher } from './Teacher'

@Entity()
export class Teaches {
  @PrimaryGeneratedColumn('increment')
  id!: number

  @ManyToOne((type) => Teacher, (teacher) => teacher.teaches)
  public teacher!: Teacher

  @ManyToOne((type) => Student, (student) => student.teaches_by)
  public student!: Student

  @CreateDateColumn()
  created_date!: Date

  @UpdateDateColumn()
  updated_date!: Date
}
