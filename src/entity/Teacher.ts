import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

@Entity()
export class Teacher {
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

  @CreateDateColumn()
  created_date!: Date

  @UpdateDateColumn()
  updated_date!: Date
}
