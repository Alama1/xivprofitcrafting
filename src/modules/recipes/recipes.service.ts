import { Injectable } from '@nestjs/common';
import { XivapiService } from '../xivapi/xivapi.service';
import { Recipe } from './recipe.entity';
import { Ingredient } from './ingridient.entity';
import { PricesService } from '../prices/prices.service';
import { DataSource, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { RecipeMapper } from './mappers/recipe.mapper';
import { ItemPrice } from '../prices/itemPrice.entity';
import { ProfitMapper } from './mappers/profit.mapper';

@Injectable()
export class RecipiesService {
    constructor(
        private readonly dataSource: DataSource,
        private readonly xivapiService: XivapiService,
        private readonly pricesService: PricesService,
        @InjectRepository(Recipe)
        private readonly recipeRepository: Repository<Recipe>,
        @InjectRepository(Ingredient)
        private readonly ingredientRepository: Repository<Ingredient>,
    ) {}

    async updateAllRecipies(page) {
        const recipes = await this.xivapiService.getRecipes(page, 3000);
    }

    async updateRecipies(page: number = 1, entriesPerPage: number = 100) {
        console.log(`Updating recipes - Page: ${page}, Entries Per Page: ${entriesPerPage}`);

        const recipes = await this.xivapiService.getRecipes(page, entriesPerPage);
        const itemIds = new Set<number>();

        for (const recipe of recipes) {
            itemIds.add(recipe.itemId);
            recipe.recipeIngredients.forEach(ingredient => itemIds.add(ingredient.itemId));
        }

        console.log('Fetching prices...');
        const priceResults = await Promise.all(
            Array.from(itemIds).map(id => this.pricesService.getPricesByItemId(id))
        );

        const pricesMap = new Map<number, ItemPrice>();
        priceResults.forEach(itemPrice => {
            if (itemPrice) {
                pricesMap.set(itemPrice.itemId, itemPrice);
            }
        });

        console.log('Prices fetched:', pricesMap.size);

        const filteredRecipies = recipes.filter(recipe => pricesMap.has(recipe.itemId));
        console.log('Filtered recipes:', filteredRecipies.length);

        // No need to create separate recipesToSave and ingredientsToSave arrays anymore
        // We'll process and save everything within the transaction

        await this.dataSource.transaction(async transactionalEntityManager => {
            console.log('Upserting recipes and ingredients...');

            for (const recipe of filteredRecipies) {
                console.log('Processing recipe:', recipe.itemId);
                const itemPrice = pricesMap.get(recipe.itemId);
                if (!itemPrice) continue;

                // 1. Create the Recipe entity (NO id assigned yet)
                const newRecipe = this.recipeRepository.create({
                    ...recipe,
                    finalItemPrice: itemPrice,
                });

                // 2. Save the Recipe entity *and get the returned object* (NOW with id)
                const savedRecipe = await transactionalEntityManager
                    .getRepository(Recipe)
                    .save(newRecipe); // Save INDIVIDUALLY

                // 3. Create and save related Ingredient entities
                for (const ingredient of recipe.recipeIngredients) {
                    const ingredientPrice = pricesMap.get(ingredient.itemId);
                    if (ingredientPrice) {
                        const newIngredient = this.ingredientRepository.create({
                            ...ingredient,
                            recipe: savedRecipe, // Use the savedRecipe with the ID
                            ingredientItemPrice: ingredientPrice,
                        });

                        // 4. Save the Ingredient entity
                        await transactionalEntityManager
                            .getRepository(Ingredient)
                            .save(newIngredient); // Save INDIVIDUALLY
                    }
                }
            }

            console.log('Database update complete.');
        });

        return recipes; // Or return something more meaningful, like the saved recipes
    }

    

    async getRecipeWithDetails(recipeId: number) {
        const response = await this.recipeRepository.findOne({
            where: { id: recipeId },
            relations: [
                'recipeIngredients',
                'recipeIngredients.ingredientItemPrice', 
                'finalItemPrice',
            ],
        });
        return RecipeMapper.toRecipes(response);
    }

    async getRecipeWithDetailsByName(recipeName: string) {
        const response = await this.recipeRepository.findOne({
            where: { name: recipeName },
            relations: [
                'recipeIngredients',
                'recipeIngredients.ingredientItemPrice', 
                'finalItemPrice',
            ],
        });
        return RecipeMapper.toRecipes(response);
    }

    async getRecipiesByName(name: string) {
        const response = await this.recipeRepository
            .createQueryBuilder('recipe')
            .leftJoinAndSelect('recipe.recipeIngredients', 'ingredient')
            .leftJoinAndSelect('ingredient.ingredientItemPrice', 'ingredientItemPrice')
            .leftJoinAndSelect('recipe.finalItemPrice', 'finalItemPrice')
            .where('recipe.name ILIKE :name', { name: `%${name}%` })
            .getMany();
        return response.map((recipe) => RecipeMapper.toRecipes(recipe));
    }

    async getAllRecipies() {
        const response = await this.recipeRepository
            .createQueryBuilder('recipe')
            .leftJoinAndSelect('recipe.recipeIngredients', 'ingredient')
            .leftJoinAndSelect('ingredient.ingredientItemPrice', 'ingredientItemPrice')
            .leftJoinAndSelect('recipe.finalItemPrice', 'finalItemPrice')
            .getMany();
        return response.map((recipe) => RecipeMapper.toRecipes(recipe));
    }

    async getProfits(minSalesADay: number, limit: number, sort: string) {
        const response = await this.recipeRepository
            .createQueryBuilder('recipe')
            .leftJoinAndSelect('recipe.recipeIngredients', 'ingredient')
            .leftJoinAndSelect('ingredient.ingredientItemPrice', 'ingredientItemPrice')
            .leftJoinAndSelect('recipe.finalItemPrice', 'finalItemPrice')
            .getMany();
        const profits = response.map((recipe) => ProfitMapper.toRecipes(recipe));
        const filtered = profits.filter((profit) => profit.sales >= minSalesADay);
        const sortedProfits = filtered.sort((a, b) => b[sort] - a[sort]);
        return sortedProfits.slice(0, limit);
    }
}
 