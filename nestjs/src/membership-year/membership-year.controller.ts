import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MembershipYearService } from './membership-year.service';
import { CreateMembershipYearDto } from './dto/create-membership-year.dto';
import { UpdateMembershipYearDto } from './dto/update-membership-year.dto';

@Controller('membership-year')
export class MembershipYearController {
  constructor(private readonly service: MembershipYearService) {}

  @Post()
  create(@Body() dto: CreateMembershipYearDto) {
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
  update(@Param('id') id: string, @Body() dto: UpdateMembershipYearDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
