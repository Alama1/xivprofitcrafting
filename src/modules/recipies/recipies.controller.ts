import { Controller, Get, Param } from '@nestjs/common';
import { RecipiesService } from './recipies.service';
import { XivapiService } from '../xivapi/xivapi.service';
import { PricesService } from '../prices/prices.service';

@Controller('recipies')
export class RecipiesController {
    constructor(
        private readonly recipiesService: RecipiesService,
        protected readonly xivapiService: XivapiService,
        protected readonly pricesService: PricesService,

    ) {}

    @Get(':page/:entries')
    async getRecipies(
        @Param('page') page: number,
        @Param('entries') entries: number,
    ) {
        return this.pricesService.getPricesByItemId(1659)
    }
}
