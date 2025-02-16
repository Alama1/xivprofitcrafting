import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Ingredient } from "./ingridient.entity";
import { ItemPrice } from "../prices/itemPrice.entity";

@Entity('recipe')
export class Recipe {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'name' }) 
    name: string;

    @Column({ name: 'item_id', nullable: false })
    itemId: number;

    @Column({ name: 'class_job' })
    classJob: string;

    @ManyToOne(() => ItemPrice, itemPrice => itemPrice.recipes, { nullable: true })
    finalItemPrice: ItemPrice;

    @OneToMany(() => Ingredient, ingredient => ingredient.recipe, { onDelete: 'CASCADE' })
    recipeIngredients: Ingredient[];

    @CreateDateColumn({ name: 'created_at' })
    createdAt?: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt?: Date;
}
