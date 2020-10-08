import { Column, CreateDateColumn, Entity, Index, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

import { BaseEntity } from '../BaseEntity'
import { Teaches } from './Teaches'

@Entity()
export class Teacher extends BaseEntity<Teacher> {
  @PrimaryGeneratedColumn('increment')
  id!: number

  @Column({ generated: 'uuid', unique: true })
  uuid!: string

  @Column({ type: 'varchar', length: 32 })
  first_name!: string

  @Column({ type: 'varchar', length: 32 })
  last_name!: string

  @Column({ type: 'varchar', length: 64, unique: true })
  email!: string

  @OneToMany((_type) => Teaches, (teaches) => teaches.teacher)
  teaches!: Promise<Teaches[]>

  @CreateDateColumn()
  created_date!: Date

  @UpdateDateColumn()
  updated_date!: Date
}
