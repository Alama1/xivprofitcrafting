import { Injectable } from '@nestjs/common';
import { XivapiService } from '../xivapi/xivapi.service';
import { Recipe } from './recipe.entity';
import { Ingredient } from './ingridient.entity';
import { PricesService } from '../prices/prices.service';
import { DataSource, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { RecipeMapper } from './mappers/recipe.mapper';
import { ItemPrice } from '../prices/itemPrice.entity';

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

    async updateAllRecipies() {
        for (let page = 1; page <= 13; page++) {
            const recipes = await this.xivapiService.getRecipes(page, 1000);
        }
    }

    async updateRecipies(page: number = 1, entriesPerPage: number = 100) {
        const recipes = await this.xivapiService.getRecipes(page, entriesPerPage);
        const itemIds = new Set<number>();
    
        for (const recipe of recipes) {
            itemIds.add(recipe.itemId);
            recipe.recipeIngredients.forEach(ingredient => itemIds.add(ingredient.itemId));
        }
    
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

        const filteredRecipies = recipes.filter(recipe => {
            return pricesMap.get(recipe.itemId)
        });

        console.log('Filtered recipes:', filteredRecipies.length);
    
        const recipesToSave = [];
        const ingredientsToSave = [];
    
        for (const recipe of filteredRecipies) {
            console.log('Processing recipe:', recipe.itemId);
            const itemPrice = pricesMap.get(recipe.itemId);
            if (!itemPrice) continue;
    
            const newRecipe = this.recipeRepository.create({
                ...recipe,
                finalItemPrice: itemPrice,
            });
            recipesToSave.push(newRecipe);
    
            for (const ingredient of recipe.recipeIngredients) {
                const ingredientPrice = pricesMap.get(ingredient.itemId);
                if (ingredientPrice) {
                    const newIngredient = this.ingredientRepository.create({
                        ...ingredient,
                        recipe: newRecipe,
                        ingredientItemPrice: ingredientPrice,
                    });
                    ingredientsToSave.push(newIngredient);
                }
            }
        }
    
        await this.dataSource.transaction(async transactionalEntityManager => {
            console.log('Saving recipes and ingredients...');
            if (recipesToSave.length > 0) {
                console.log('Saving recipes...', recipesToSave.length);
                const savedRecipes = await transactionalEntityManager.save(Recipe, recipesToSave);
                console.log('Recipes saved:', savedRecipes.length);
                const recipeMap = new Map<number, Recipe>();
                savedRecipes.forEach(recipe => recipeMap.set(recipe.itemId, recipe));
        
                ingredientsToSave.forEach(ingredient => {
                    const savedRecipe = recipeMap.get(ingredient.recipe.itemId);
                    if (savedRecipe) {
                        ingredient.recipe = savedRecipe;
                    }
                });
            }
        
            if (ingredientsToSave.length > 0) {
                console.log('Saving ingredients...');
                await transactionalEntityManager.save(Ingredient, ingredientsToSave);
                console.log('Ingredients saved.');
            }
        });
        
    
        return recipes;
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
}
 