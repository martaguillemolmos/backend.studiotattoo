import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Worker } from "./Worker";
import { Portfolio } from "./Portfolio";

const Products = {
  tatto: "tatto",
  piercing: "piercing",
};

@Entity("products")
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "enum", enum: Products })
  type!: string;

  @Column()
  product!: string;

  @Column()
  price!: number;

  @Column()
  description!: string;

  @Column()
  image!: string;

  @Column()
  created_at!: Date;

  @Column()
  update_at!: Date;


  //Declaramos la relación muchos a muchos que existe con la tabla Worker.
  @ManyToMany(() => Worker)
  @JoinTable({
    name: "portfolios",
    joinColumn: {
      name: "product_id",
      referencedColumnName: "id",
    },
    inverseJoinColumn: {
      name: "worker_id",
      referencedColumnName: "id",
    },
  })
  productWorkers!: Worker[];

  //Declaramos la relación que existe entre Product y la tabla intermedia, Portfolio
  @OneToMany(() => Portfolio, (portfolio) => portfolio.worker)
  portfolios!: Portfolio[];
}
