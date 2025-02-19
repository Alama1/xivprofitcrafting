import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Ingredient } from '../recipes/ingridient.entity';
import { Recipe } from '../recipes/recipe.entity';

@Entity('prices')
export class ItemPrice {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'item_id', nullable: false, unique: true })
  itemId: number;

  @Column({ name: 'world_price', default: null, nullable: true })
  louiPrice: number;

  @Column({ name: 'world_price_hq', default: null, nullable: true })
  louiHQPrice: number;

  @Column({ name: 'dc_price', default: null, nullable: true })
  chaosPrice: number;

  @Column({ name: 'dc_price_hq', default: null, nullable: true })
  chaosHQPrice: number;

  @Column({ name: 'europe_price', default: null, nullable: true })
  europePrice: number;

  @Column({ name: 'europe_price_hq', default: null, nullable: true })
  europeHQPrice: number;

  @Column({ name: 'min_listing', default: null, nullable: true })
  minPriceListed: number;

  @Column({ name: 'min_listing_hq', default: null, nullable: true })
  minHQPriceListed: number;

  @Column({ name: 'daily_sales', default: 0 })
  dailySales: number;

  @Column({ name: 'daily_sales_hq', default: 0 })
  dailySalesHQ: number;

  @OneToMany(() => Recipe, (recipe) => recipe.finalItemPrice)
  recipes: Recipe[];

  @OneToMany(() => Ingredient, (ingredient) => ingredient.ingredientItemPrice)
  ingredients: Ingredient[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt?: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt?: Date;
}
