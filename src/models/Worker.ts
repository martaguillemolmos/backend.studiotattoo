import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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
}
