import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { ItemPriceMapper } from './mappers/itemPrice.mapper';
import { ItemPrice } from './itemPrice.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PricesService {
  baseUrl = 'https://universalis.app/api/v2';
  constructor(
    private readonly httpService: HttpService,
    @InjectRepository(ItemPrice)
    private readonly pricesRepository: Repository<ItemPrice>
  ) {}

  async fetchPrices(id: number[]) {
    const url = `${this.baseUrl}/aggregated/Louisoix/${id.join(',')}`;
    const res = await firstValueFrom(this.httpService.get(url));
    return ItemPriceMapper.getData(res.data);
  }

  async getSellableItems() {
    const url = 'https://universalis.app/api/v2/marketable';
    return await firstValueFrom(this.httpService.get(url));
  }

  async updateDatabasePrices() {
    const items = await this.getSellableItems();
    const batchSize = 100;

    for (let i = 0; i < items.data.length; i += batchSize) {
      const batch = items.data.slice(i, i + batchSize);
      console.log(`Fetching batch ${batch}...`);

      try {
        const prices = await this.fetchPrices(batch);
        const priceEntities = prices.map((price) =>
          this.pricesRepository.create(price)
        );
        await this.pricesRepository.upsert(priceEntities, ['itemId']);
      } catch (error) {
        console.error(`Error fetching batch ${i / batchSize + 1}:`, error);
      }

      await new Promise((resolve) => setTimeout(resolve, 50)); // 50ms delay = 20 requests/sec
    }
  }

  async getPricesByItemId(id: number) {
    return this.pricesRepository.findOne({ where: { itemId: id } });
  }
}
