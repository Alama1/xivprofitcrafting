import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Ingridient } from "./ingridient.entity";
import { ItemPrice } from "../prices/itemPrice.entity";

@Entity('recipe')
export class Recipe {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'name' }) 
    name: string;

    @Column({ name: 'class_job' })
    classJob: string;

    @OneToMany(() => ItemPrice, price => price.item)
    price: ItemPrice;

    @OneToMany(() => Ingridient, ingridient => ingridient.recipe, { onDelete: 'CASCADE' })
    recipeIngredients: Ingridient[];

    @CreateDateColumn({ name: 'created_at' })
    createdAt?: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt?: Date;
}