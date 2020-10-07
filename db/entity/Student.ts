import { Column, CreateDateColumn, Entity, Index, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

import { BaseEntity } from '../BaseEntity'
import { Suspension } from './Suspension'
import { Teaches } from './Teaches'

@Entity()
export class Student extends BaseEntity<Student> {
  @PrimaryGeneratedColumn('increment')
  id!: number

  @Column({ generated: 'uuid', unique: true })
  @Index()
  uuid!: string

  @Column({ type: 'varchar', length: 32 })
  first_name!: string

  @Column({ type: 'varchar', length: 32 })
  last_name!: string

  @Column({ type: 'varchar', length: 64, unique: true })
  @Index()
  email!: string

  @OneToMany((_type) => Teaches, (teaches) => teaches.student)
  teaches_by!: Promise<Teaches[]>

  @OneToMany((_type) => Suspension, (suspension) => suspension.student)
  suspensions!: Promise<Suspension[]>

  @CreateDateColumn()
  created_date!: Date

  @UpdateDateColumn()
  updated_date!: Date

  async isSuspended(): Promise<boolean> {
    for (const suspension of await this.suspensions) {
      if (suspension.active) {
        return true
      }
    }
    return false
  }
}
