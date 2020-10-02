import { Column, CreateDateColumn, Entity, Index, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

import { Teaches } from './Teaches'

@Entity()
export class Student {
  @PrimaryGeneratedColumn('increment')
  id!: number

  @Column({ generated: 'uuid', unique: true })
  @Index()
  uuid!: string

  @Column({ type: 'varchar', length: 32 })
  first_name!: string

  @Column({ type: 'varchar', length: 32 })
  last_name!: string

  @Column({ type: 'varchar', length: 32, unique: true })
  @Index()
  email!: string

  @OneToMany((type) => Teaches, (teaches) => teaches.student)
  public teaches_by!: Teaches[]

  @CreateDateColumn()
  created_date!: Date

  @UpdateDateColumn()
  updated_date!: Date
}
