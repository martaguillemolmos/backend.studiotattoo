import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { Portfolio } from "./Portfolio";
import { Users } from "./User";

@Entity("appointment")
export class Appointment extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;
  
    @Column()
    user_id!: number;

    @Column()
    worker_id!: number;
  
    @Column()
    portfolio_id!: number;

    @Column()
    portfolio_price!: number;

    @Column()
    day!: Date;

    @Column()
    hour!: Date;

    @Column()
    is_active!: boolean;
  
    @Column()
    created_at!: Date;
  
    @Column()
    update_at!: Date;

    @OneToMany (() => Portfolio, (portfolio) => portfolio.appointment)
    portfolios! : Portfolio []

}
