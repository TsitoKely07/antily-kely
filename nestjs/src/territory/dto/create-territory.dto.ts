import { IsNotEmpty, IsOptional, IsString, IsNumber } from 'class-validator';

export class CreateTerritoryDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsNumber()
  number?: number;

  @IsOptional()
  @IsString()
  territoryDependanceId?: string;

  @IsOptional()
  @IsString()
  territoryLevelId?: string;

}
