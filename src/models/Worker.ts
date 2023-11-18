import { BaseEntity, Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Users } from "./User";
import { Product } from "./Product";
import { Appointment } from "./Appointment";
import { Portfolio } from "./Portfolio";


@Entity("workers")
export class Worker extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  user_id!: number;

  @Column()
  is_active!: boolean;

  @Column()
  formation!: string;

  @Column()
  experience!: string;

  @Column()
  contracted_at!: Date;

  @Column()
  update_at!: Date;


//Declaramos la relación uno a uno que existe entre la tabla Users.
  @OneToOne(() => Users, { eager: true })
  @JoinColumn({ name: "user_id" })
  users!: Users;

  //Declaramos la relación que existe entre Worker y la tabla intermedia, Portfolio
  @OneToMany ( () => Portfolio, (portfolio) => portfolio.portfolioWorker)
  portfolioWorkers! : Portfolio [];

  //Declaramos la relación muchos a muchos que existe con la tabla Product.
  @ManyToMany ( () => Product)
  @JoinTable ({
    name:"portfolios",
    joinColumn:{
        name:"worker_id",
        referencedColumnName: "id",
    },
    inverseJoinColumn: {
        name:"product_id",
        referencedColumnName:"id",
    }
  })
  workerProduct!:Product []

  //Declaramos la relación que existe entre Worker y la tabla intermedia, Appoiment
 @OneToMany ( () => Appointment, (appointment) => appointment.workerAppointment)
 workerAppointments! : Appointment [];

  //Declaramos la relación muchos a muchos que existe con la tabla Users.
  @ManyToMany ( () => Users)
  @JoinTable ({
    name:"appointment",
    joinColumn:{
        name:"artist",
        referencedColumnName: "id",
    },
    inverseJoinColumn: {
        name:"client",
        referencedColumnName:"id",
    }
  })
  workerUsers!:Users []

}
