import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Territory } from './entities/territory.entity';
import { TerritoryService } from './territory.service';
import { TerritoryController } from './territory.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Territory])],
  controllers: [TerritoryController],
  providers: [TerritoryService],
  exports: [TerritoryService],
})
export class TerritoryModule {}
