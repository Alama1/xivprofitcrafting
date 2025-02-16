import { Injectable } from '@nestjs/common';
import { RecipeMapper } from './mappers/recipe.mapper';

@Injectable()
export class XivapiService {
    baseUrl = 'https://xivapi.com';
    columns = [
        "ID",
        "ItemResult.ID", 
        "ItemResult.Name", 
        "ItemIngredient0.ID",  
        "ItemIngredient0.Name",
        "ItemIngredient1.ID", 
        "ItemIngredient1.Name",
        "ItemIngredient2.ID",
        "ItemIngredient2.Name", 
        "ItemIngredient3.ID",
        "ItemIngredient3.Name",
        "ItemIngredient4.ID",
        "ItemIngredient4.Name",
        "ItemIngredient5.ID",
        "ItemIngredient5.Name",
        "ItemIngredient6.ID",
        "ItemIngredient6.Name",
        "ItemIngredient7.ID",
        "ItemIngredient7.Name",
        "ItemIngredient8.ID",
        "ItemIngredient8.Name",
        "ItemIngredient9.ID",
        "ItemIngredient9.Name",
        "AmountIngredient0",
        "AmountIngredient1",
        "AmountIngredient2",
        "AmountIngredient3",
        "AmountIngredient4",
        "AmountIngredient5",
        "AmountIngredient6",
        "AmountIngredient7",
        "AmountIngredient8",
        "AmountIngredient9",
        "ClassJob.Name",
    ]

    async getRecipies(page: number = 1, entriesPerPage: number = 100) {
        const response = await fetch(`https://xivapi.com/recipe/?columns=${this.columns.join(',')}&limit=${entriesPerPage}&page=${page}`,{
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + process.env.XIVAPI_KEY,
            },
        });
        const data = await response.json();
        return RecipeMapper.toRecipies(data)
    }
}
