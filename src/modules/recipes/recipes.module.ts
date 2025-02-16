import { Module } from '@nestjs/common';
import { RecipiesService } from './recipes.service';
import { RecipiesController } from './recipes.controller';
import { XivapiModule } from '../xivapi/xivapi.module';
import { PricesModule } from '../prices/prices.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Recipe } from './recipe.entity';
import { Ingredient } from './ingridient.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Recipe, Ingredient]), XivapiModule, PricesModule],
  providers: [RecipiesService],
  controllers: [RecipiesController]
})
export class RecipesModule {}
