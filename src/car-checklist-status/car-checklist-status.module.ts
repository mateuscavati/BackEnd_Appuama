import { Module } from '@nestjs/common';
import { CarChecklistStatusService } from './car-checklist-status.service';
import { CarChecklistStatusController } from './car-checklist-status.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [CarChecklistStatusController],
  providers: [CarChecklistStatusService],
  exports: [CarChecklistStatusService], // Export if other modules need to use it
})
export class CarChecklistStatusModule {}
