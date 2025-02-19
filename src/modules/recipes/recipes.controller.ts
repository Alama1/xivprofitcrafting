import { Controller, Get, Param, Query } from '@nestjs/common';
import { RecipiesService } from './recipes.service';
import { PricesService } from '../prices/prices.service';
import e from 'express';

@Controller('recipes')
export class RecipiesController {
  constructor(
    private readonly recipiesService: RecipiesService,
    protected readonly pricesService: PricesService
  ) {}

  @Get('/id/:id')
  async getRecipie(@Param('id') id: number) {
    return this.recipiesService.getRecipeWithDetails(id);
  }

  @Get('/name/:name')
  async getRecipieByName(@Param('name') name: string) {
    return this.recipiesService.getRecipiesByName(name);
  }

  @Get('/all')
  async getAllRecipies() {
    return this.recipiesService.getAllRecipies();
  }

  @Get('/profit')
  async getProfit(
    @Query('sales') sales: number,
    @Query('limit') limit: number,
    @Query('sort') sort: Sort
  ) {
    return this.recipiesService.getProfits(sales, limit, sort);
  }

  @Get('/update')
  async updateRecipies(
    @Query('page') page: number,
    @Query('entries') entries: number
  ) {
    return this.recipiesService.updateRecipies(page, entries);
  }

  @Get('/update/prices')
  async updatePrices() {
    return this.pricesService.updateDatabasePrices();
  }
}

enum Sort {
  chaos = 'profitChaos',
  listed = 'profitLoui',
  loui = 'profitListed',
}
