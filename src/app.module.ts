import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RecipiesModule } from './modules/recipies/recipies.module';
import { XivapiModule } from './modules/xivapi/xivapi.module';
import { PricesModule } from './modules/prices/prices.module';

@Module({
  imports: [RecipiesModule, XivapiModule, PricesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
