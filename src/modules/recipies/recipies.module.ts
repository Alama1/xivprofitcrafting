import { Module } from '@nestjs/common';
import { RecipiesService } from './recipies.service';
import { RecipiesController } from './recipies.controller';
import { XivapiModule } from '../xivapi/xivapi.module';
import { PricesModule } from '../prices/prices.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Recipe } from './recipe.entity';
import { Ingridient } from './ingridient.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Recipe, Ingridient]), XivapiModule, PricesModule],
  providers: [RecipiesService],
  controllers: [RecipiesController]
})
export class RecipiesModule {}
