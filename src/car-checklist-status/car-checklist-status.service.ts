import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCarChecklistStatusDto } from './dto/create-car-checklist-status.dto';
import { UpdateCarChecklistStatusDto } from './dto/update-car-checklist-status.dto';

@Injectable()
export class CarChecklistStatusService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createCarChecklistStatusDto: CreateCarChecklistStatusDto) {
    // Check if a status for this car and checklist item already exists
    const existingStatus = await this.prisma.carChecklistStatus.findUnique({
      where: {
        carroId_checklistItemId: {
          carroId: createCarChecklistStatusDto.carroId,
          checklistItemId: createCarChecklistStatusDto.checklistItemId,
        },
      },
    });

    if (existingStatus) {
      // If it exists, update it instead of creating a new one
      return this.prisma.carChecklistStatus.update({
        where: {
          carroId_checklistItemId: {
            carroId: createCarChecklistStatusDto.carroId,
            checklistItemId: createCarChecklistStatusDto.checklistItemId,
          },
        },
        data: { isCompleted: createCarChecklistStatusDto.isCompleted },
      });
    }

    return this.prisma.carChecklistStatus.create({
      data: createCarChecklistStatusDto,
    });
  }

  findAll() {
    return this.prisma.carChecklistStatus.findMany({
      include: {
        carro: true,
        checklistItem: true,
      },
    });
  }

  async findOne(id: number) {
    const status = await this.prisma.carChecklistStatus.findUnique({ where: { id } });
    if (!status) {
      throw new NotFoundException(`CarChecklistStatus with ID ${id} not found`);
    }
    return status;
  }

  async update(id: number, updateCarChecklistStatusDto: UpdateCarChecklistStatusDto) {
    return this.prisma.carChecklistStatus.update({
      where: { id },
      data: updateCarChecklistStatusDto,
    });
  }

  remove(id: number) {
    return this.prisma.carChecklistStatus.delete({ where: { id } });
  }

  // New methods for car checklist status
  async findCarChecklistStatus(carroId: number) {
    return this.prisma.carChecklistStatus.findMany({
      where: { carroId },
      include: {
        checklistItem: true,
      },
    });
  }

  async updateCarChecklistItemStatus(carroId: number, checklistItemId: number, isCompleted: boolean) {
    // Upsert logic: create if not exists, update if exists
    return this.prisma.carChecklistStatus.upsert({
      where: {
        carroId_checklistItemId: {
          carroId: carroId,
          checklistItemId: checklistItemId,
        },
      },
      update: { isCompleted },
      create: {
        carroId,
        checklistItemId,
        isCompleted,
      },
    });
  }

  async getCarOverallChecklistStatus(carroId: number): Promise<'pending' | 'operational' | 'no_checklist'> {
    const allChecklistItems = await this.prisma.checklistItem.findMany();
    if (allChecklistItems.length === 0) {
      return 'operational'; // If no checklist items are defined, the car is considered operational.
    }

    const carSpecificStatuses = await this.prisma.carChecklistStatus.findMany({
      where: { carroId },
      select: {
        checklistItemId: true,
        isCompleted: true,
      },
    });

    // Create a map for quick lookup of a car's specific checklist item statuses
    const carStatusMap = new Map(
      carSpecificStatuses.map((item) => [item.checklistItemId, item.isCompleted]),
    );

    // Check if all global checklist items are completed for this car
    const allCompleted = allChecklistItems.every((globalItem) => {
      const isCarItemCompleted = carStatusMap.get(globalItem.id);
      return isCarItemCompleted === true; // Must be explicitly true
    });

    return allCompleted ? 'operational' : 'pending';
  }
}
