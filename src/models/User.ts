import { BaseEntity, Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Worker } from "./Worker";
import { Appointment } from "./Appointment";
import { IsEmail, IsString, MaxLength, MinLength, IsDate, IsBoolean, IsEnum, IsNumber, Max, Min} from "class-validator";

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
  @IsString()
  @MaxLength(100)
  @MinLength(3)
  name!: string

  @Column()
  @IsString()
  @MaxLength(100)
  @MinLength(3)
  surname!: string

  @Column()
  @IsNumber()
  @Max(999999999)
  @Min(600000000)
  phone!: number

  @Column()
  @IsEmail()
  email!: string

  @Column()
  @IsString()
  @MaxLength(12)
  @MinLength(6)
  password!: string

  @Column({default: true})
  @IsBoolean()
  is_active!: boolean

  @Column({type:"enum", enum: Roles})
  @IsEnum(Roles)
  role!:string

  @Column()
  @IsDate()
  created_at!: Date

  @Column()
  @IsDate()
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
// Aquí nos devuelve una array de objetos, si no indicamos [], tan sólo nos devolvería un objeto.
 userWorkers!:Worker [];

 //Declaramos la relación que existe entre User y la tabla intermedia, Appoiment
 @OneToMany ( () => Appointment, (appointment) => appointment.user)
 appointments! : Appointment [];
}

