import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateChecklistItemDto } from './dto/create-checklist-item.dto';
import { UpdateChecklistItemDto } from './dto/update-checklist-item.dto';

@Injectable()
export class ChecklistItemsService {
  constructor(private readonly prisma: PrismaService) {}

  create(createChecklistItemDto: CreateChecklistItemDto) {
    return this.prisma.checklistItem.create({ data: createChecklistItemDto });
  }

  findAll() {
    return this.prisma.checklistItem.findMany();
  }

  async findOne(id: number) {
    const checklistItem = await this.prisma.checklistItem.findUnique({
      where: { id },
    });
    if (!checklistItem) {
      throw new NotFoundException(`ChecklistItem with ID ${id} not found`);
    }
    return checklistItem;
  }

  update(id: number, updateChecklistItemDto: UpdateChecklistItemDto) {
    return this.prisma.checklistItem.update({
      where: { id },
      data: updateChecklistItemDto,
    });
  }

  remove(id: number) {
    return this.prisma.checklistItem.delete({ where: { id } });
  }
}
