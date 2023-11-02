import { BaseEntity, Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Appointment } from "./Appointment";
import { Worker } from "./Worker";
import { Product } from "./Product";

@Entity("porfolios")
export class Portfolio extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  worker_id!: number;

  @Column()
  product_id!: number;

  @Column()
  created_at!: Date;

  @Column()
  update_at!: Date;

  // Declaramos la relación que existe entre esta tabla y la tabla Appointment.
  @ManyToOne ( () => Appointment, (appointment) => appointment.portfolios)
  @JoinColumn ({name: "portfolio_id"})
  appointment!: Appointment []

  //Declaramos la relación que existe entre esta tabla y Workers.
  @ManyToOne ( () => Worker , (worker) => worker.portfolios)
  @JoinColumn ({ name: "worker_id"})
  worker!: Worker [];

  //Declaramos la relación que existe entre esta tabla y Product.
  @ManyToOne ( () => Product , (product) => product.portfolios)
  @JoinColumn ({ name: "product_id"})
  product!: Product [];
  
}
