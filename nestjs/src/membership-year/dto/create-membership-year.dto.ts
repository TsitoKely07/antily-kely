import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateMembershipYearDto {
  @IsOptional()
  @IsString()
  label?: string;

}
