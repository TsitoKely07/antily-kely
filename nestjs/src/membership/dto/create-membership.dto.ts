import { IsNotEmpty, IsOptional, IsString, IsNumber } from 'class-validator';

export class CreateMembershipDto {
  @IsNotEmpty()
  @IsString()
  territoryId: string;

  @IsOptional()
  @IsString()
  memberId?: string;

  @IsOptional()
  @IsString()
  roleDetail?: string;

  @IsNotEmpty()
  @IsNumber()
  status: number;

  @IsOptional()
  @IsString()
  membershipFeeId?: string;

  @IsOptional()
  @IsString()
  membershipPaymentId?: string;

}
