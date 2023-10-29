import { IsEmail } from "class-validator";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

const Roles = {
  user: 'user',
  admin: 'admin',
  super_admin: 'super_admin'
}

@Entity("users")
export class Users extends BaseEntity {
 
  @PrimaryGeneratedColumn()
  id!: number

  @Column()
  name!: string

  @Column()
  surname!: string

  @Column()
  phone!: string

  @Column()
  @IsEmail()
  email!: string

  @Column()
  password!: string

  @Column()
  is_active!: boolean

  @Column({type:"enum", enum: Roles})
  role!:string

  @Column()
  created_at!: Date

  @Column()
  update_at!: Date
}
