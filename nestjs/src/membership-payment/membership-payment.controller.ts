import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MembershipPaymentService } from './membership-payment.service';
import { CreateMembershipPaymentDto } from './dto/create-membership-payment.dto';
import { UpdateMembershipPaymentDto } from './dto/update-membership-payment.dto';

@Controller('membership-payment')
export class MembershipPaymentController {
  constructor(private readonly service: MembershipPaymentService) {}

  @Post()
  create(@Body() dto: CreateMembershipPaymentDto) {
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
  update(@Param('id') id: string, @Body() dto: UpdateMembershipPaymentDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
