import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MembershipPayment } from './entities/membership-payment.entity';
import { CreateMembershipPaymentDto } from './dto/create-membership-payment.dto';
import { UpdateMembershipPaymentDto } from './dto/update-membership-payment.dto';

@Injectable()
export class MembershipPaymentService {
  constructor(
    @InjectRepository(MembershipPayment)
    private readonly repository: Repository<MembershipPayment>,
  ) {}

  create(dto: CreateMembershipPaymentDto) {
    const entity = this.repository.create(dto as Partial<MembershipPayment>);
    return this.repository.save(entity);
  }

  findAll() {
    return this.repository.find({ relations: ['memberships'] });
  }

  async findOne(id: string | number) {
    const entity = await this.repository.findOne({ where: { id } as any, relations: ['memberships'] });
    if (!entity) throw new NotFoundException(`MembershipPayment ${id} introuvable`);
    return entity;
  }

  async update(id: string | number, dto: UpdateMembershipPaymentDto) {
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
