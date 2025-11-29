import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { CarChecklistStatusService } from './car-checklist-status.service';
import { CreateCarChecklistStatusDto } from './dto/create-car-checklist-status.dto';
import { UpdateCarChecklistStatusDto } from './dto/update-car-checklist-status.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

@ApiTags('car-checklist-status')
@Controller('car-checklist-status')
export class CarChecklistStatusController {
  constructor(private readonly carChecklistStatusService: CarChecklistStatusService) {}

  @Post()
  @ApiOperation({ summary: 'Create a car checklist status entry' })
  @ApiResponse({ status: 201, description: 'The car checklist status has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  create(@Body() createCarChecklistStatusDto: CreateCarChecklistStatusDto) {
    return this.carChecklistStatusService.create(createCarChecklistStatusDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all car checklist status entries' })
  @ApiResponse({ status: 200, description: 'Returns all car checklist status entries.' })
  findAll() {
    return this.carChecklistStatusService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a car checklist status entry by ID' })
  @ApiResponse({ status: 200, description: 'Returns the car checklist status entry.' })
  @ApiResponse({ status: 404, description: 'Car Checklist Status not found.' })
  findOne(@Param('id') id: string) {
    return this.carChecklistStatusService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a car checklist status entry by ID' })
  @ApiResponse({ status: 200, description: 'The car checklist status entry has been successfully updated.' })
  @ApiResponse({ status: 404, description: 'Car Checklist Status not found.' })
  update(@Param('id') id: string, @Body() updateCarChecklistStatusDto: UpdateCarChecklistStatusDto) {
    return this.carChecklistStatusService.update(+id, updateCarChecklistStatusDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a car checklist status entry by ID' })
  @ApiResponse({ status: 204, description: 'The car checklist status entry has been successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Car Checklist Status not found.' })
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.carChecklistStatusService.remove(+id);
  }

  // Custom endpoints for car checklist status
  @Get('car/:carId/overall')
  @ApiOperation({ summary: 'Get overall checklist status for a car' })
  @ApiResponse({ status: 200, description: 'Returns an object with "status": "pending" or "operational" or "no_checklist".' })
  async getCarOverallChecklistStatus(@Param('carId') carId: string) {
    const status = await this.carChecklistStatusService.getCarOverallChecklistStatus(+carId);
    return { status };
  }

  @Get('car/:carId')
  @ApiOperation({ summary: 'Get all checklist item statuses for a specific car' })
  @ApiResponse({ status: 200, description: 'Returns a list of checklist item statuses for the car.' })
  findCarChecklistStatus(@Param('carId') carId: string) {
    return this.carChecklistStatusService.findCarChecklistStatus(+carId);
  }

  @Patch('car/:carroId/item/:checklistItemId')
  @ApiOperation({ summary: 'Update the status of a specific checklist item for a specific car' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        isCompleted: { type: 'boolean', example: true },
      },
      required: ['isCompleted'],
    },
  })
  @ApiResponse({ status: 200, description: 'Checklist item status updated successfully.' })
  @ApiResponse({ status: 404, description: 'Car or Checklist Item not found.' })
  updateCarChecklistItemStatus(
    @Param('carroId') carroId: string,
    @Param('checklistItemId') checklistItemId: string,
    @Body('isCompleted') isCompleted: boolean,
  ) {
    return this.carChecklistStatusService.updateCarChecklistItemStatus(+carroId, +checklistItemId, isCompleted);
  }
}
