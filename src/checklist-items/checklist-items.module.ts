import { Module } from '@nestjs/common';
import { ChecklistItemsService } from './checklist-items.service';
import { ChecklistItemsController } from './checklist-items.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ChecklistItemsController],
  providers: [ChecklistItemsService],
  exports: [ChecklistItemsService],
})
export class ChecklistItemsModule {}
