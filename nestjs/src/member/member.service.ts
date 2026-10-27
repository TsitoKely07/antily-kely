import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Member } from './entities/member.entity';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';

@Injectable()
export class MemberService {
  constructor(
    @InjectRepository(Member)
    private readonly repository: Repository<Member>,
  ) {}

  create(dto: CreateMemberDto) {
    const entity = this.repository.create(dto as Partial<Member>);
    return this.repository.save(entity);
  }

  findAll() {
    return this.repository.find({ relations: ['memberships'] });
  }

  async findOne(id: string | number) {
    const entity = await this.repository.findOne({ where: { id } as any, relations: ['memberships'] });
    if (!entity) throw new NotFoundException(`Member ${id} introuvable`);
    return entity;
  }

  async update(id: string | number, dto: UpdateMemberDto) {
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
