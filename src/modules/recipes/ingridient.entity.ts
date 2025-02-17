import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm";
import { Recipe } from "./recipe.entity";
import { ItemPrice } from "../prices/itemPrice.entity";

@Entity('ingredient')
@Unique([ 'itemId', 'recipe' ])
export class Ingredient {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'item_id', nullable: false })
    itemId: number;

    @Column({ name: 'item_name', nullable: false })
    name: string;

    @Column({ name: 'amount', nullable: false, default: 1 })
    amount: number;

    @ManyToOne(() => Recipe)
    @JoinColumn({ name: 'recipe_id' })
    recipe: Recipe;

    @Column({ name: 'recipe_id' })
    recipeId: number;

    @ManyToOne(() => ItemPrice)
    @JoinColumn({ name: 'ingredient_item_price_id' })
    ingredientItemPrice: ItemPrice;

    @CreateDateColumn({ name: 'created_at' })
    createdAt?: Date;
    
    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt?: Date;
}
