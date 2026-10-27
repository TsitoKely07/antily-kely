import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MembershipYear } from './entities/membership-year.entity';
import { MembershipYearService } from './membership-year.service';
import { MembershipYearController } from './membership-year.controller';

@Module({
  imports: [TypeOrmModule.forFeature([MembershipYear])],
  controllers: [MembershipYearController],
  providers: [MembershipYearService],
  exports: [MembershipYearService],
})
export class MembershipYearModule {}
