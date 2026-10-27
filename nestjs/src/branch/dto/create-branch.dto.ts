import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateBranchDto {
  @IsOptional()
  @IsString()
  name?: string;

}
