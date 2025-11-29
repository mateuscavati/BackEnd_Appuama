import { IsInt, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCarChecklistStatusDto {
  @ApiProperty({ description: 'The ID of the car' })
  @IsInt()
  carroId: number;

  @ApiProperty({ description: 'The ID of the checklist item' })
  @IsInt()
  checklistItemId: number;

  @ApiProperty({ description: 'The completion status of the checklist item for the car' })
  @IsBoolean()
  isCompleted: boolean;
}
