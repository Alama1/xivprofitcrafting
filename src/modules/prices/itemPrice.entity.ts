import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Ingridient } from "../recipies/ingridient.entity";

@Entity('prices')
export class ItemPrice {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToMany(() => Ingridient, ingridient => ingridient.recipe)
    item: Ingridient[];

    @Column({ name: 'price', default: 0 })
    price: number;

    @Column({ name: 'price_hq', default: 0 })
    priceHQ: number;

    @CreateDateColumn({ name: 'created_at' })
    createdAt?: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt?: Date;
}