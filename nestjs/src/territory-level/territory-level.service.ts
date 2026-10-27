import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TerritoryLevel } from './entities/territory-level.entity';
import { CreateTerritoryLevelDto } from './dto/create-territory-level.dto';
import { UpdateTerritoryLevelDto } from './dto/update-territory-level.dto';

@Injectable()
export class TerritoryLevelService {
  constructor(
    @InjectRepository(TerritoryLevel)
    private readonly repository: Repository<TerritoryLevel>,
  ) {}

  create(dto: CreateTerritoryLevelDto) {
    const entity = this.repository.create(dto as Partial<TerritoryLevel>);
    return this.repository.save(entity);
  }

  findAll() {
    return this.repository.find({ relations: ['territories', 'membershipFees', 'roles'] });
  }

  async findOne(id: string | number) {
    const entity = await this.repository.findOne({ where: { id } as any, relations: ['territories', 'membershipFees', 'roles'] });
    if (!entity) throw new NotFoundException(`TerritoryLevel ${id} introuvable`);
    return entity;
  }

  async update(id: string | number, dto: UpdateTerritoryLevelDto) {
    const entity = await this.findOne(id);
    Object.assign(entity, dto);
    return this.repository.save(entity);
  }

  async remove(id: string | number) {
    const entity = await this.findOne(id);
    await this.repository.remove(entity);
    return entity;
  }
}
