import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MembershipFeeService } from './membership-fee.service';
import { CreateMembershipFeeDto } from './dto/create-membership-fee.dto';
import { UpdateMembershipFeeDto } from './dto/update-membership-fee.dto';

@Controller('membership-fee')
export class MembershipFeeController {
  constructor(private readonly service: MembershipFeeService) {}

  @Post()
  create(@Body() dto: CreateMembershipFeeDto) {
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
  update(@Param('id') id: string, @Body() dto: UpdateMembershipFeeDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
