import { PartialType } from '@nestjs/mapped-types';
import { CreateMembershipYearDto } from './create-membership-year.dto';

export class UpdateMembershipYearDto extends PartialType(CreateMembershipYearDto) {}
