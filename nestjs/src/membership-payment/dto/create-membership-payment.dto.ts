import { IsNotEmpty, IsOptional, IsDateString, IsNumber } from 'class-validator';

export class CreateMembershipPaymentDto {
  @IsOptional()
  @IsDateString()
  date?: Date;

  @IsOptional()
  @IsNumber()
  amount?: number;

  @IsOptional()
  @IsNumber()
  status?: number;

}
