import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MembershipFee } from './entities/membership-fee.entity';
import { MembershipFeeService } from './membership-fee.service';
import { MembershipFeeController } from './membership-fee.controller';

@Module({
  imports: [TypeOrmModule.forFeature([MembershipFee])],
  controllers: [MembershipFeeController],
  providers: [MembershipFeeService],
  exports: [MembershipFeeService],
})
export class MembershipFeeModule {}
