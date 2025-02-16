import { Recipe } from "src/modules/recipes/recipe.entity";

export class RecipeMapper {
    static async toRecipes(response): Promise<Recipe[]> {
        return await Promise.all(response.Results.map(async recipe => {
            const ingredients = [];

            for (let i = 0; i <= 9; i++) {
                const itemKey = `ItemIngredient${i}`;
                const amountKey = `AmountIngredient${i}`;

                if (recipe[itemKey] && recipe[itemKey].ID) {
                    ingredients.push({
                        itemId: recipe[itemKey].ID,
                        name: recipe[itemKey].Name,
                        amount: recipe[amountKey] || 1
                    });
                }
            }

            return {
                id: recipe.ID,
                name: recipe.ItemResult.Name,
                classJob: recipe.ClassJob.Name,
                itemId: recipe.ItemResult.ID,
                recipeIngredients: ingredients,
            };
        }));
    }
}
