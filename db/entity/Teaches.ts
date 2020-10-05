import { CreateDateColumn, Entity, Index, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

import { Student } from './Student'
import { Teacher } from './Teacher'

@Entity()
@Index(['teacher', 'student'], { unique: true })
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

  constructor(initialValue?: Partial<Teaches>) {
    if (initialValue) {
      Object.keys(initialValue).forEach((it) => {
        // @ts-ignore
        this[it] = initialValue[it]
      })
    }
  }
}
