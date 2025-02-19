import { Recipe } from 'src/modules/recipes/recipe.entity';

export class RecipeMapper {
  static toRecipes(response) {
    const finalItem = this.finalItemPrice(response.finalItemPrice);
    const ingredients = response.recipeIngredients.map((ingridient) => {
      return this.getIngridient(ingridient);
    });
    const ingredientsTotalPrice = ingredients.reduce((acc, ingridient) => {
      return (
        acc +
        Math.min(ingridient.europePrice, ingridient.chaosPrice) *
          ingridient.amount
      );
    }, 0);
    const ingredientsTotalPriceHQ = ingredients.reduce((acc, ingridient) => {
      return (
        acc +
        Math.min(
          ingridient.europeHQPrice || ingridient.europePrice,
          ingridient.chaosHQPrice || ingridient.chaosPrice
        ) *
          ingridient.amount
      );
    }, 0);
    return {
      id: response.id,
      name: response.name,
      ingredientsTotalPrice,
      ingredientsTotalPriceHQ,
      classJob: response.classJob,
      ...finalItem,
      ingredients,
    };
  }

  static getIngridient(ingridient) {
    return {
      itemId: ingridient.itemId,
      amount: ingridient.amount,
      louiPrice: ingridient.ingredientItemPrice.louiPrice,
      louiHQPrice: ingridient.ingredientItemPrice.louiHQPrice,
      chaosPrice: ingridient.ingredientItemPrice.chaosPrice,
      chaosHQPrice: ingridient.ingredientItemPrice.chaosHQPrice,
      europePrice: ingridient.ingredientItemPrice.europePrice,
      europeHQPrice: ingridient.ingredientItemPrice.europeHQPrice,
      minPriceListed: ingridient.ingredientItemPrice.minPriceListed,
      minHQPriceListed: ingridient.ingredientItemPrice.minHQPriceListed,
      dailySales: ingridient.ingredientItemPrice.dailySales,
      dailySalesHQ: ingridient.ingredientItemPrice.dailySalesHQ,
    };
  }

  static finalItemPrice(finalItem) {
    return {
      itemId: finalItem.itemId,
      louiPrice: finalItem.louiPrice,
      louiHQPrice: finalItem.louiHQPrice,
      minPriceListed: finalItem.minPriceListed,
      minHQPriceListed: finalItem.minHQPriceListed,
      dailySales: finalItem.dailySales,
      dailySalesHQ: finalItem.dailySalesHQ,
    };
  }
}
