import { Controller, Get, Param, Query } from '@nestjs/common';
import { RecipiesService } from './recipes.service';
import { PricesService } from '../prices/prices.service';

@Controller('recipes')
export class RecipiesController {
    constructor(
        private readonly recipiesService: RecipiesService,
        protected readonly pricesService: PricesService,

    ) {}

    @Get('/id/:id')
    async getRecipie(@Param('id') id: number) {
        return this.recipiesService.getRecipeWithDetails(id)
    }

    @Get('/name/:name')
    async getRecipieByName(@Param('name') name: string) {
        return this.recipiesService.getRecipiesByName(name)
    }

    @Get('/all')
    async getAllRecipies() {
        return this.recipiesService.getAllRecipies()
    }
}
