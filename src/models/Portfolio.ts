import { BaseEntity, Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Appointment } from "./Appointment";
import { Worker } from "./Worker";
import { Product } from "./Product";

@Entity("portfolios")
export class Portfolio extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  worker_id!: number;

  @Column()
  product_id!: number;

  @Column()
  is_active!: boolean;

  @Column()
  created_at!: Date;

  @Column()
  update_at!: Date;

  // Declaramos la relación que existe entre esta tabla y la tabla Appointment.
  @OneToMany(() => Appointment, (appointment) => appointment.portfolio)
  appointments!: Appointment[];

  //Declaramos la relación que existe entre esta tabla y Workers.
  @ManyToOne ( () => Worker , (worker) => worker.workerAppointments)
  @JoinColumn ({ name: "worker_id"})
  workerAppointment!: Worker;

  //Declaramos la relación que existe entre esta tabla y Product.
  @ManyToOne ( () => Product , (product) => product.portfolioWorkers)
  @JoinColumn ({ name: "product_id"})
  portfolioWorker!: Product;
  
}
