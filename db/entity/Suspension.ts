import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

import { BaseEntity } from '../BaseEntity'
import { Student } from './Student'
import { Teacher } from './Teacher'

@Entity()
export class Suspension extends BaseEntity<Suspension> {
  @PrimaryGeneratedColumn('increment')
  id!: number

  @Column()
  active!: boolean

  @CreateDateColumn()
  created_date!: Date

  @UpdateDateColumn()
  updated_date!: Date

  @ManyToOne((type) => Student, (student) => student.suspensions, { eager: true })
  student!: Student
}
