import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MembershipPayment } from './entities/membership-payment.entity';
import { MembershipPaymentService } from './membership-payment.service';
import { MembershipPaymentController } from './membership-payment.controller';

@Module({
  imports: [TypeOrmModule.forFeature([MembershipPayment])],
  controllers: [MembershipPaymentController],
  providers: [MembershipPaymentService],
  exports: [MembershipPaymentService],
})
export class MembershipPaymentModule {}
