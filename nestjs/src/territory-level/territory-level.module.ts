import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TerritoryLevel } from './entities/territory-level.entity';
import { TerritoryLevelService } from './territory-level.service';
import { TerritoryLevelController } from './territory-level.controller';

@Module({
  imports: [TypeOrmModule.forFeature([TerritoryLevel])],
  controllers: [TerritoryLevelController],
  providers: [TerritoryLevelService],
  exports: [TerritoryLevelService],
})
export class TerritoryLevelModule {}
