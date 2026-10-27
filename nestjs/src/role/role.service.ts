import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from './entities/role.entity';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private readonly repository: Repository<Role>,
  ) {}

  create(dto: CreateRoleDto) {
    const { territoryLevelId, branchId, ...rest } = dto as any;
    const entity = this.repository.create(rest as Partial<Role>);
    if (territoryLevelId !== undefined) entity.territoryLevel = { id: territoryLevelId } as any;
    if (branchId !== undefined) entity.branch = { id: branchId } as any;
    return this.repository.save(entity);
  }

  findAll() {
    return this.repository.find({ relations: ['territoryLevel', 'branch', 'membershipFees'] });
  }

  async findOne(id: string | number) {
    const entity = await this.repository.findOne({ where: { id } as any, relations: ['territoryLevel', 'branch', 'membershipFees'] });
    if (!entity) throw new NotFoundException(`Role ${id} introuvable`);
    return entity;
  }

  async update(id: string | number, dto: UpdateRoleDto) {
    const entity = await this.findOne(id);
    const { territoryLevelId, branchId, ...rest } = dto as any;
    Object.assign(entity, rest);
    if (territoryLevelId !== undefined) entity.territoryLevel = { id: territoryLevelId } as any;
    if (branchId !== undefined) entity.branch = { id: branchId } as any;
    return this.repository.save(entity);
  }

  async remove(id: string | number) {
    const entity = await this.findOne(id);
    await this.repository.remove(entity);
    return entity;
  }
}
