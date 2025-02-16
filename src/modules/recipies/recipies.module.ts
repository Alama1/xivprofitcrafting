import { Module } from '@nestjs/common';
import { RecipiesService } from './recipies.service';
import { RecipiesController } from './recipies.controller';
import { XivapiModule } from '../xivapi/xivapi.module';

@Module({
  imports: [XivapiModule],
  providers: [RecipiesService],
  controllers: [RecipiesController]
})
export class RecipiesModule {}
