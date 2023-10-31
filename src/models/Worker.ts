import { BaseEntity, Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Users } from "./User";
import { Product } from "./Product";

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

  @OneToOne(() => Users)
  @JoinColumn({ name: "user_id" })
  users!: Users;

  @ManyToMany ( () => Product)
  @JoinTable ({
    name:"portfolio",
    joinColumn:{
        name:"worker_id",
        referencedColumnName: "id",
    },
    inverseJoinColumn: {
        name:"product_id",
        referencedColumnName:"id",
    }
  })
  workerProducts!:Product []
}
