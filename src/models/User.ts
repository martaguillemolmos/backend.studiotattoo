import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("users")
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column ()
  name!: string

  @Column ()
  surname!: string

  @Column ()
  phone!: string

  @Column ()
  email!: string

  @Column ()
  password!: string

  @Column()
  is_active!: boolean

  @Column()
  role!: string

  @Column()
  created_at!: Date

  @Column()
  update_at!: Date
}
