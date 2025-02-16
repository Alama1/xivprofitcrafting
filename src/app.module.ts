import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RecipesModule } from './modules/recipes/recipes.module';
import { XivapiModule } from './modules/xivapi/xivapi.module';
import { PricesModule } from './modules/prices/prices.module';
import { dataSourceOptions } from './data-source'
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    RecipesModule, 
    XivapiModule, 
    PricesModule,
    TypeOrmModule.forRoot(dataSourceOptions),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
