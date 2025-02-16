import { Controller, Get, Param } from '@nestjs/common';
import { RecipiesService } from './recipies.service';
import { XivapiService } from '../xivapi/xivapi.service';

@Controller('recipies')
export class RecipiesController {
    constructor(
        private readonly recipiesService: RecipiesService,
        protected readonly xivapiService: XivapiService,

    ) {}

    @Get(':page/:entries')
    async getRecipies(
        @Param('page') page: number,
        @Param('entries') entries: number,
    ) {
        return this.xivapiService.getRecipies(page,entries);
    }
}
