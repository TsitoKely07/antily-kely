import { IsNotEmpty, IsOptional, IsNumber, IsString } from 'class-validator';

export class CreateTerritoryLevelDto {
  @IsOptional()
  @IsNumber()
  level?: number;

  @IsOptional()
  @IsString()
  name?: string;

}
