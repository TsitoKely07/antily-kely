import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Membership } from './entities/membership.entity';
import { CreateMembershipDto } from './dto/create-membership.dto';
import { UpdateMembershipDto } from './dto/update-membership.dto';

@Injectable()
export class MembershipService {
  constructor(
    @InjectRepository(Membership)
    private readonly repository: Repository<Membership>,
  ) {}

  create(dto: CreateMembershipDto) {
    const { territoryId, memberId, membershipFeeId, membershipPaymentId, ...rest } = dto as any;
    const entity = this.repository.create(rest as Partial<Membership>);
    if (territoryId !== undefined) entity.territory = { id: territoryId } as any;
    if (memberId !== undefined) entity.member = { id: memberId } as any;
    if (membershipFeeId !== undefined) entity.membershipFee = { id: membershipFeeId } as any;
    if (membershipPaymentId !== undefined) entity.membershipPayment = { id: membershipPaymentId } as any;
    return this.repository.save(entity);
  }

  findAll() {
    return this.repository.find({ relations: ['territory', 'member', 'membershipFee', 'membershipPayment'] });
  }

  async findOne(id: string | number) {
    const entity = await this.repository.findOne({ where: { id } as any, relations: ['territory', 'member', 'membershipFee', 'membershipPayment'] });
    if (!entity) throw new NotFoundException(`Membership ${id} introuvable`);
    return entity;
  }

  async update(id: string | number, dto: UpdateMembershipDto) {
    const entity = await this.findOne(id);
    const { territoryId, memberId, membershipFeeId, membershipPaymentId, ...rest } = dto as any;
    Object.assign(entity, rest);
    if (territoryId !== undefined) entity.territory = { id: territoryId } as any;
    if (memberId !== undefined) entity.member = { id: memberId } as any;
    if (membershipFeeId !== undefined) entity.membershipFee = { id: membershipFeeId } as any;
    if (membershipPaymentId !== undefined) entity.membershipPayment = { id: membershipPaymentId } as any;
    return this.repository.save(entity);
  }

  async remove(id: string | number) {
    const entity = await this.findOne(id);
    await this.repository.remove(entity);
    return entity;
  }
}
