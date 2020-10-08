import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

import { BaseEntity } from '../BaseEntity'
import { Student } from './Student'

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

  @ManyToOne((_type) => Student, (student) => student.suspensions, { eager: true })
  @JoinTable()
  student!: Student
}
