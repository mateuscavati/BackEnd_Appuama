import { PartialType } from '@nestjs/swagger';
import { CreateCarChecklistStatusDto } from './create-car-checklist-status.dto';
import { IsBoolean, IsOptional } from 'class-validator';

export class UpdateCarChecklistStatusDto extends PartialType(CreateCarChecklistStatusDto) {
  @IsBoolean()
  @IsOptional()
  isCompleted?: boolean;
}
