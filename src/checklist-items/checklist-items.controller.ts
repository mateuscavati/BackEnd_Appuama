import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
} from "@nestjs/common"
import { ChecklistItemsService } from "./checklist-items.service"
import { CreateChecklistItemDto } from "./dto/create-checklist-item.dto"
import { JwtAuthGuard } from "src/auth/jwt-auth.guard"
import { AdminGuard } from "src/auth/admin.guard"

@Controller("checklist-items")
@UseGuards(JwtAuthGuard) // Protect all routes
export class ChecklistItemsController {
  constructor(private readonly checklistItemsService: ChecklistItemsService) {}

  @Post()
  @UseGuards(AdminGuard) // Only admins can create checklist items
  create(@Body() createChecklistItemDto: CreateChecklistItemDto) {
    return this.checklistItemsService.create(createChecklistItemDto)
  }

  @Get()
  findAll() {
    return this.checklistItemsService.findAll()
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.checklistItemsService.findOne(+id)
  }

  @Delete(":id")
  @UseGuards(AdminGuard) // Only admins can remove checklist items
  remove(@Param("id") id: string) {
    return this.checklistItemsService.remove(+id)
  }
}