import { Recipe } from "src/modules/recipies/recipe.entity";

export class RecipeMapper {
    static toRecipies(response): Promise<Recipe[]> {
        return response.Results.map(recipe => {
            return {
                id: recipe.ID,
                name: recipe.ItemResult.Name,
                classJob: recipe.ClassJob.Name,
                ingredients: [
                    {
                        id: recipe.ItemIngredient0.ID,
                        name: recipe.ItemIngredient0.Name,
                        amount: recipe.AmountIngredient0
                    },
                    {
                        id: recipe.ItemIngredient1.ID,
                        name: recipe.ItemIngredient1.Name,
                        amount: recipe.AmountIngredient1
                    },
                    {
                        id: recipe.ItemIngredient2.ID,
                        name: recipe.ItemIngredient2.Name,
                        amount: recipe.AmountIngredient2
                    },
                    {
                        id: recipe.ItemIngredient3.ID,
                        name: recipe.ItemIngredient3.Name,
                        amount: recipe.AmountIngredient3
                    },
                    {
                        id: recipe.ItemIngredient4.ID,
                        name: recipe.ItemIngredient4.Name,
                        amount: recipe.AmountIngredient4
                    },
                    {
                        id: recipe.ItemIngredient5.ID,
                        name: recipe.ItemIngredient5.Name,
                    },
                    {
                        id: recipe.ItemIngredient6.ID,
                        name: recipe.ItemIngredient6.Name,
                    },
                    {
                        id: recipe.ItemIngredient7.ID,
                        name: recipe.ItemIngredient7.Name,
                        amount: recipe.AmountIngredient7
                    },
                    {
                        id: recipe.ItemIngredient8.ID,
                        name: recipe.ItemIngredient8.Name,
                        amount: recipe.AmountIngredient8
                    },
                    {
                        id: recipe.ItemIngredient9.ID,
                        name: recipe.ItemIngredient9.Name,
                        amount: recipe.AmountIngredient9
                    }
                ]
            }
        });
    }
}