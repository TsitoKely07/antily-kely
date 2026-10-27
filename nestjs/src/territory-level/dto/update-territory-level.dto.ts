import { PartialType } from '@nestjs/mapped-types';
import { CreateTerritoryLevelDto } from './create-territory-level.dto';

export class UpdateTerritoryLevelDto extends PartialType(CreateTerritoryLevelDto) {}
