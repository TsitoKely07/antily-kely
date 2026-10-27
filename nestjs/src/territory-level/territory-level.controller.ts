import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TerritoryLevelService } from './territory-level.service';
import { CreateTerritoryLevelDto } from './dto/create-territory-level.dto';
import { UpdateTerritoryLevelDto } from './dto/update-territory-level.dto';

@Controller('territory-level')
export class TerritoryLevelController {
  constructor(private readonly service: TerritoryLevelService) {}

  @Post()
  create(@Body() dto: CreateTerritoryLevelDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateTerritoryLevelDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
