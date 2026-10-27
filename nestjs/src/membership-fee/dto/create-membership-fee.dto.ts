import { IsNotEmpty, IsOptional, IsString, IsNumber } from 'class-validator';

export class CreateMembershipFeeDto {
  @IsOptional()
  @IsString()
  membershipYearId?: string;

  @IsOptional()
  @IsNumber()
  fee?: number;

  @IsOptional()
  @IsString()
  roleId?: string;

}
