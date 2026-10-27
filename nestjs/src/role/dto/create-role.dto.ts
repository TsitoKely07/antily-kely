import { IsNotEmpty, IsOptional, IsString, IsBoolean } from 'class-validator';

export class CreateRoleDto {
  @IsOptional()
  @IsString()
  territoryLevelId?: string;

  @IsOptional()
  @IsString()
  branchId?: string;

  @IsOptional()
  @IsBoolean()
  isYouth?: boolean;

  @IsOptional()
  @IsString()
  label?: string;

}
