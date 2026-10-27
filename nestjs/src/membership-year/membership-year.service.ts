import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MembershipYear } from './entities/membership-year.entity';
import { CreateMembershipYearDto } from './dto/create-membership-year.dto';
import { UpdateMembershipYearDto } from './dto/update-membership-year.dto';

@Injectable()
export class MembershipYearService {
  constructor(
    @InjectRepository(MembershipYear)
    private readonly repository: Repository<MembershipYear>,
  ) {}

  create(dto: CreateMembershipYearDto) {
    const entity = this.repository.create(dto as Partial<MembershipYear>);
    return this.repository.save(entity);
  }

  findAll() {
    return this.repository.find({ relations: ['membershipFees'] });
  }

  async findOne(id: string | number) {
    const entity = await this.repository.findOne({ where: { id } as any, relations: ['membershipFees'] });
    if (!entity) throw new NotFoundException(`MembershipYear ${id} introuvable`);
    return entity;
  }

  async update(id: string | number, dto: UpdateMembershipYearDto) {
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
