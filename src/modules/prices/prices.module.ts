import { Module } from '@nestjs/common';
import { PricesService } from './prices.service';
import { ItemPrice } from './itemPrice.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [TypeOrmModule.forFeature([ItemPrice]), HttpModule],
  providers: [PricesService],
  exports: [PricesService],
})
export class PricesModule {}
