import { ItemPrice } from 'src/modules/prices/itemPrice.entity';

export class ItemPriceMapper {
  static getData(response): Promise<ItemPrice[]> {
    return response.results.map((item) => {
      return {
        itemId: item.itemId,
        louiPrice: item.nq.averageSalePrice.world?.price.toFixed(0) || null,
        louiHQPrice: item.hq.averageSalePrice.world?.price.toFixed(0) || null,
        chaosPrice: item.nq.averageSalePrice.dc?.price.toFixed(0) || null,
        chaosHQPrice: item.hq.averageSalePrice.dc?.price.toFixed(0) || null,
        europePrice: item.nq.averageSalePrice.region?.price.toFixed(0) || null,
        europeHQPrice:
          item.hq.averageSalePrice.region?.price.toFixed(0) || null,
        minPriceListed: item.nq.minListing.world?.price.toFixed(0) || null,
        minHQPriceListed: item.hq.minListing.world?.price.toFixed(0) || null,
        dailySales: item.nq.dailySaleVelocity.world?.quantity.toFixed(0) || 0,
        dailySalesHQ: item.hq.dailySaleVelocity.world?.quantity.toFixed(0) || 0,
      };
    });
  }
}
