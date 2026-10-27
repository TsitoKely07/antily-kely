import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Territory } from './entities/territory.entity';
import { CreateTerritoryDto } from './dto/create-territory.dto';
import { UpdateTerritoryDto } from './dto/update-territory.dto';

@Injectable()
export class TerritoryService {
  constructor(
    @InjectRepository(Territory)
    private readonly repository: Repository<Territory>,
  ) {}

  create(dto: CreateTerritoryDto) {
    const { territoryDependanceId, territoryLevelId, ...rest } = dto as any;
    const entity = this.repository.create(rest as Partial<Territory>);
    if (territoryDependanceId !== undefined) entity.territory = { id: territoryDependanceId } as any;
    if (territoryLevelId !== undefined) entity.territoryLevel = { id: territoryLevelId } as any;
    return this.repository.save(entity);
  }

  findAll() {
    return this.repository.find({ relations: ['territory', 'memberships', 'territoryLevel'] });
  }

  async findOne(id: string | number) {
    const entity = await this.repository.findOne({ where: { id } as any, relations: ['territory', 'memberships', 'territoryLevel'] });
    if (!entity) throw new NotFoundException(`Territory ${id} introuvable`);
    return entity;
  }

  async update(id: string | number, dto: UpdateTerritoryDto) {
    const entity = await this.findOne(id);
    const { territoryDependanceId, territoryLevelId, ...rest } = dto as any;
    Object.assign(entity, rest);
    if (territoryDependanceId !== undefined) entity.territory = { id: territoryDependanceId } as any;
    if (territoryLevelId !== undefined) entity.territoryLevel = { id: territoryLevelId } as any;
    return this.repository.save(entity);
  }

  async remove(id: string | number) {
    const entity = await this.findOne(id);
    await this.repository.remove(entity);
    return entity;
  }
}
