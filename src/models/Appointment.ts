import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { Portfolio } from "./Portfolio";
import { Users } from "./User";
import { Worker } from "./Worker";

const Status = { 
    pending: 'pending',
    approved: 'approved',
    canceled: 'canceled',
    made: 'made'
  }

@Entity("appointment")
export class Appointment extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;
  
    @Column()
    client!: number;

    @Column()
    artist!: number;
  
    @Column()
    portfolio_id!: number;

    @Column()
    day!: string;

    @Column()
    hour!: string;

    @Column({type:"enum", enum: Status})
    status_appointment!: string;

    @Column()
    is_active!: boolean;
  
    @Column()
    created_at!: Date;
  
    @Column()
    update_at!: Date;

    //Declaramos la relación que existe entre esta tabla y la tabla Portfolio.
    @ManyToOne(() => Portfolio, (portfolio) => portfolio.appointments)
    @JoinColumn({ name: "portfolio_id" })
    portfolio!: Portfolio;

    //Declaramos la relación que existe entre esta tabla y Users.
    @ManyToOne ( () => Users , (user) => user.userAppointments)
    @JoinColumn ({ name: "client"})
    userAppointment!: Users;

    //Declaramos la relación que existe entre esta tabla y Worker.
     @ManyToOne ( () => Worker, (worker) => worker.workerAppointments)
     @JoinColumn ({ name: "artist"})
     workerAppointment!: Worker;
}
