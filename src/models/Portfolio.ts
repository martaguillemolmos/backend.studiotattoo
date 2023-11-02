import { BaseEntity, Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Appointment } from "./Appointment";

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

  @ManyToOne ( () => Appointment, (appointment) => appointment.portfolios)
  @JoinColumn ({name: "portfolio_id"})
  appointment!: Appointment []

  
}
