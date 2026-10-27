import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MembershipFee } from './entities/membership-fee.entity';
import { CreateMembershipFeeDto } from './dto/create-membership-fee.dto';
import { UpdateMembershipFeeDto } from './dto/update-membership-fee.dto';

@Injectable()
export class MembershipFeeService {
  constructor(
    @InjectRepository(MembershipFee)
    private readonly repository: Repository<MembershipFee>,
  ) {}

  create(dto: CreateMembershipFeeDto) {
    const { membershipYearId, id, roleId, ...rest } = dto as any;
    const entity = this.repository.create(rest as Partial<MembershipFee>);
    if (membershipYearId !== undefined) entity.membershipYear = { id: membershipYearId } as any;
    if (id !== undefined) entity.territoryLevel = { id: id } as any;
    if (roleId !== undefined) entity.role = { id: roleId } as any;
    return this.repository.save(entity);
  }

  findAll() {
    return this.repository.find({ relations: ['membershipYear', 'territoryLevel', 'role', 'memberships'] });
  }

  async findOne(id: string | number) {
    const entity = await this.repository.findOne({ where: { id } as any, relations: ['membershipYear', 'territoryLevel', 'role', 'memberships'] });
    if (!entity) throw new NotFoundException(`MembershipFee ${id} introuvable`);
    return entity;
  }

  async update(id: string | number, dto: UpdateMembershipFeeDto) {
    const entity = await this.findOne(id);
    const { membershipYearId, id, roleId, ...rest } = dto as any;
    Object.assign(entity, rest);
    if (membershipYearId !== undefined) entity.membershipYear = { id: membershipYearId } as any;
    if (id !== undefined) entity.territoryLevel = { id: id } as any;
    if (roleId !== undefined) entity.role = { id: roleId } as any;
    return this.repository.save(entity);
  }

  async remove(id: string | number) {
    const entity = await this.findOne(id);
    await this.repository.remove(entity);
    return entity;
  }
}
