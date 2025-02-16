import { Module } from '@nestjs/common';
import { XivapiService } from './xivapi.service';

@Module({
  providers: [XivapiService],
  exports: [XivapiService],
})
export class XivapiModule {}
