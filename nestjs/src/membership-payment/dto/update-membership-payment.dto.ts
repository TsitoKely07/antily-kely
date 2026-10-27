import { PartialType } from '@nestjs/mapped-types';
import { CreateMembershipPaymentDto } from './create-membership-payment.dto';

export class UpdateMembershipPaymentDto extends PartialType(CreateMembershipPaymentDto) {}
