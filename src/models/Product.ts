import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm"

const Products = {
tatto: 'tatto',
tatto_design: 'tatto design',
piercing: 'piercing'
}

@Entity("products")
export class Product extends BaseEntity {

@PrimaryGeneratedColumn ()
id!: number

@Column ({type:"enum", enum: Products})
type!:string

@Column ()
product!: string

@Column()
price!: number

@Column()
description!: string

@Column()
image!: string

@Column()
created_at!: Date

@Column()
update_at!: Date
}
