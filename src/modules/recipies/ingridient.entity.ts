import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Recipe } from "./recipe.entity";
import { ItemPrice } from "../prices/itemPrice.entity";

@Entity('ingridient')
export class Ingridient {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'item_id', nullable: false})
    itemId: number;
    
    @Column({ name: 'item_name', nullable: false })
    name: string;

    @Column({ name: 'amount', nullable: false })
    amount: number;

    @OneToMany(() => ItemPrice, price => price.item)
    price: ItemPrice;

    @ManyToOne(() => Recipe, recipe => recipe.recipeIngredients)
    recipe: Recipe;

    @CreateDateColumn({ name: 'created_at' })
    createdAt?: Date;
    
    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt?: Date;
}