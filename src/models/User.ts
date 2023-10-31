import { BaseEntity, Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Worker } from "./Worker";

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
  phone!: number

  @Column()
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

  @ManyToMany ( () => Worker)
  @JoinTable ({
    name:"appointment",
    joinColumn:{
        name:"user_id",
        referencedColumnName: "id",
    },
    inverseJoinColumn: {
        name:"worker_id",
        referencedColumnName:"id",
    }
  })
 userWorkers!:Worker []
}

