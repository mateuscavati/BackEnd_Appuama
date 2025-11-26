import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateReportDto } from './dto/create-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';
import { Prisma } from '@prisma/client'; // Import Prisma

@Injectable()
export class ReportsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createReportDto: CreateReportDto) { // Make it async
    console.log('ReportsService: Received createReportDto:', createReportDto); // Log incoming DTO

    const {
      carroId,
      usuarioId,
      balanceamentoId,
      checklistItems, // Destructure checklistItems
      dataTeste, // Destructure date/time fields
      horaInicio,
      horaFim,
      distanciaPercorrida, // Destructure numeric fields for Decimal conversion
      pressaoDEAntes, pressaoDEDepois, desgasteDEAntes, desgasteDEDepois,
      pressaoDDAntes, pressaoDDDepois, desgasteDDAntes, desgasteDDDepois,
      pressaoTEAntes, pressaoTEDepois, desgasteTEAntes, desgasteTEDepois,
      pressaoTDAntes, pressaoTDDepois, desgasteTDAntes, desgasteTDDepois, // Add these
      tamanhoMolaDE, tamanhoMolaDD, tamanhoMolaTE, tamanhoMolaTD,
      errosMecanicos, // Destructure
      errosHumanos,   // Destructure
      observacoesPiloto, // Destructure
      balanceFrontPercentage, // Destructure
      balanceRearPercentage,  // Destructure
      balanceLeftPercentage,  // Destructure
      balanceRightPercentage, // Destructure
    } = createReportDto;

    const dataToCreate: Prisma.TesteReportCreateInput = {
      carro: { connect: { id: carroId } },
      usuario: { connect: { id: usuarioId } },
      balanceamento: balanceamentoId ? { connect: { id: balanceamentoId } } : undefined, // Optional relation

      pilotoNome: createReportDto.pilotoNome, // Explicitly map
      tipoSessao: createReportDto.tipoSessao, // Explicitly map
      tempoTotal: createReportDto.tempoTotal, // Explicitly map

      dataTeste: dataTeste ? new Date(dataTeste) : undefined,
      horaInicio: horaInicio ? new Date(horaInicio) : undefined,
      horaFim: horaFim ? new Date(horaFim) : undefined,

      distanciaPercorrida: distanciaPercorrida !== undefined ? new Prisma.Decimal(distanciaPercorrida) : null,
      
      errosMecanicos: errosMecanicos !== undefined ? errosMecanicos : 0, // Explicitly handle, ensure 0 if undefined
      errosHumanos: errosHumanos !== undefined ? errosHumanos : 0,     // Explicitly handle, ensure 0 if undefined
      observacoesPiloto: observacoesPiloto !== undefined ? observacoesPiloto : null, // Explicitly handle string
      
      pressaoDEAntes: pressaoDEAntes !== undefined ? new Prisma.Decimal(pressaoDEAntes) : null,
      pressaoDEDepois: pressaoDEDepois !== undefined ? new Prisma.Decimal(pressaoDEDepois) : null,
      desgasteDEAntes: desgasteDEAntes !== undefined ? new Prisma.Decimal(desgasteDEAntes) : null,
      desgasteDEDepois: desgasteDEDepois !== undefined ? new Prisma.Decimal(desgasteDEDepois) : null,

      pressaoDDAntes: pressaoDDAntes !== undefined ? new Prisma.Decimal(pressaoDDAntes) : null,
      pressaoDDDepois: pressaoDDDepois !== undefined ? new Prisma.Decimal(pressaoDDDepois) : null,
      desgasteDDAntes: desgasteDDAntes !== undefined ? new Prisma.Decimal(desgasteDDAntes) : null,
      desgasteDDDepois: desgasteDDDepois !== undefined ? new Prisma.Decimal(desgasteDDDepois) : null,

      pressaoTEAntes: pressaoTEAntes !== undefined ? new Prisma.Decimal(pressaoTEAntes) : null,
      pressaoTEDepois: pressaoTEDepois !== undefined ? new Prisma.Decimal(pressaoTEDepois) : null,
      desgasteTEAntes: desgasteTEAntes !== undefined ? new Prisma.Decimal(desgasteTEAntes) : null,
      desgasteTEDepois: desgasteTEDepois !== undefined ? new Prisma.Decimal(desgasteTEDepois) : null,

      pressaoTDAntes: pressaoTDAntes !== undefined ? new Prisma.Decimal(pressaoTDAntes) : null,
      pressaoTDDepois: pressaoTDDepois !== undefined ? new Prisma.Decimal(pressaoTDDepois) : null,
      desgasteTDAntes: desgasteTDAntes !== undefined ? new Prisma.Decimal(desgasteTDAntes) : null,
      desgasteTDDepois: desgasteTDDepois !== undefined ? new Prisma.Decimal(desgasteTDDepois) : null,

      tamanhoMolaDE: tamanhoMolaDE !== undefined ? new Prisma.Decimal(tamanhoMolaDE) : null,
      tamanhoMolaDD: tamanhoMolaDD !== undefined ? new Prisma.Decimal(tamanhoMolaDD) : null,
      tamanhoMolaTE: tamanhoMolaTE !== undefined ? new Prisma.Decimal(tamanhoMolaTE) : null,
      tamanhoMolaTD: tamanhoMolaTD !== undefined ? new Prisma.Decimal(tamanhoMolaTD) : null,

      balanceFrontPercentage: balanceFrontPercentage !== undefined ? new Prisma.Decimal(balanceFrontPercentage) : null,
      balanceRearPercentage: balanceRearPercentage !== undefined ? new Prisma.Decimal(balanceRearPercentage) : null,
      balanceLeftPercentage: balanceLeftPercentage !== undefined ? new Prisma.Decimal(balanceLeftPercentage) : null,
      balanceRightPercentage: balanceRightPercentage !== undefined ? new Prisma.Decimal(balanceRightPercentage) : null,

      checklistItems: {
        createMany: {
          data: checklistItems ? checklistItems.map(item => ({
            checklistItemId: item.checklistItemId,
            status: item.status,
          })) : [],
        },
      },
    };

    console.log('ReportsService: Data to create:', dataToCreate); // Log data before Prisma call
    return this.prisma.testeReport.create({ data: dataToCreate });
  }

  findAll() {
    return this.prisma.testeReport.findMany();
  }

  async findOne(id: number) {
    const report = await this.prisma.testeReport.findUnique({ where: { id } });
    if (!report) {
      throw new NotFoundException(`Report with ID ${id} not found`);
    }
    return report;
  }

  async update(id: number, updateReportDto: UpdateReportDto) { // Make it async
    const {
      carroId,
      usuarioId,
      balanceamentoId,
      checklistItems, // Destructure checklistItems
      dataTeste, // Destructure date/time fields
      horaInicio,
      horaFim,
      distanciaPercorrida, // Destructure numeric fields for Decimal conversion
      pressaoDEAntes, pressaoDEDepois, desgasteDEAntes, desgasteDEDepois,
      pressaoDDAntes, pressaoDDDepois, desgasteDDAntes, desgasteDDDepois,
      pressaoTEAntes, pressaoTEDepois, desgasteTEAntes, desgasteTEDepois,
      tamanhoMolaDD, tamanhoMolaTE, tamanhoMolaTD,
      balanceFrontPercentage, // Destructure
      balanceRearPercentage,  // Destructure
      balanceLeftPercentage,  // Destructure
      balanceRightPercentage, // Destructure
      ...rest // Collect other fields
    } = updateReportDto;

    const dataToUpdate: Prisma.TesteReportUpdateInput = {
      ...rest, // Spread remaining fields
    };

    if (carroId !== undefined) {
        dataToUpdate.carro = { connect: { id: carroId } };
    }
    if (usuarioId !== undefined) {
        dataToUpdate.usuario = { connect: { id: usuarioId } };
    }
    if (balanceamentoId !== undefined) {
        dataToUpdate.balanceamento = { connect: { id: balanceamentoId } };
    }

    if (dataTeste !== undefined) dataToUpdate.dataTeste = dataTeste ? new Date(dataTeste) : null;
    if (horaInicio !== undefined) dataToUpdate.horaInicio = horaInicio ? new Date(horaInicio) : null;
    if (horaFim !== undefined) dataToUpdate.horaFim = horaFim ? new Date(horaFim) : null;

    if (updateReportDto.distanciaPercorrida !== undefined) dataToUpdate.distanciaPercorrida = updateReportDto.distanciaPercorrida ? new Prisma.Decimal(updateReportDto.distanciaPercorrida) : null;
    
    // Explicitly handle balance percentage fields
    if (updateReportDto.balanceFrontPercentage !== undefined) dataToUpdate.balanceFrontPercentage = updateReportDto.balanceFrontPercentage ? new Prisma.Decimal(updateReportDto.balanceFrontPercentage) : null;
    if (updateReportDto.balanceRearPercentage !== undefined) dataToUpdate.balanceRearPercentage = updateReportDto.balanceRearPercentage ? new Prisma.Decimal(updateReportDto.balanceRearPercentage) : null;
    if (updateReportDto.balanceLeftPercentage !== undefined) dataToUpdate.balanceLeftPercentage = updateReportDto.balanceLeftPercentage ? new Prisma.Decimal(updateReportDto.balanceLeftPercentage) : null;
    if (updateReportDto.balanceRightPercentage !== undefined) dataToUpdate.balanceRightPercentage = updateReportDto.balanceRightPercentage ? new Prisma.Decimal(updateReportDto.balanceRightPercentage) : null;

    if (updateReportDto.pressaoDEAntes !== undefined) dataToUpdate.pressaoDEAntes = updateReportDto.pressaoDEAntes ? new Prisma.Decimal(updateReportDto.pressaoDEAntes) : null;
    if (updateReportDto.pressaoDEDepois !== undefined) dataToUpdate.pressaoDEDepois = updateReportDto.pressaoDEDepois ? new Prisma.Decimal(updateReportDto.pressaoDEDepois) : null;
    if (updateReportDto.desgasteDEAntes !== undefined) dataToUpdate.desgasteDEAntes = updateReportDto.desgasteDEAntes ? new Prisma.Decimal(updateReportDto.desgasteDEAntes) : null;
    if (updateReportDto.desgasteDEDepois !== undefined) dataToUpdate.desgasteDEDepois = updateReportDto.desgasteDEDepois ? new Prisma.Decimal(updateReportDto.desgasteDEDepois) : null;

    if (updateReportDto.pressaoDDAntes !== undefined) dataToUpdate.pressaoDDAntes = updateReportDto.pressaoDDAntes ? new Prisma.Decimal(updateReportDto.pressaoDDAntes) : null;
    if (updateReportDto.pressaoDDDepois !== undefined) dataToUpdate.pressaoDDDepois = updateReportDto.pressaoDDDepois ? new Prisma.Decimal(updateReportDto.pressaoDDDepois) : null;
    if (updateReportDto.desgasteDDAntes !== undefined) dataToUpdate.desgasteDDAntes = updateReportDto.desgasteDDAntes ? new Prisma.Decimal(updateReportDto.desgasteDDAntes) : null;
    if (updateReportDto.desgasteDDDepois !== undefined) dataToUpdate.desgasteDDDepois = updateReportDto.desgasteDDDepois ? new Prisma.Decimal(updateReportDto.desgasteDDDepois) : null;

    if (updateReportDto.pressaoTEAntes !== undefined) dataToUpdate.pressaoTEAntes = updateReportDto.pressaoTEAntes ? new Prisma.Decimal(updateReportDto.pressaoTEAntes) : null;
    if (updateReportDto.pressaoTEDepois !== undefined) dataToUpdate.pressaoTEDepois = updateReportDto.pressaoTEDepois ? new Prisma.Decimal(updateReportDto.pressaoTEDepois) : null;
    if (updateReportDto.desgasteTEAntes !== undefined) dataToUpdate.desgasteTEAntes = updateReportDto.desgasteTEAntes ? new Prisma.Decimal(updateReportDto.desgasteTEAntes) : null;
    if (updateReportDto.desgasteTEDepois !== undefined) dataToUpdate.desgasteTEDepois = updateReportDto.desgasteTEDepois ? new Prisma.Decimal(updateReportDto.desgasteTEDepois) : null;

    if (updateReportDto.pressaoTDAntes !== undefined) dataToUpdate.pressaoTDAntes = updateReportDto.pressaoTDAntes ? new Prisma.Decimal(updateReportDto.pressaoTDAntes) : null;
    if (updateReportDto.pressaoTDDepois !== undefined) dataToUpdate.pressaoTDDepois = updateReportDto.pressaoTDDepois ? new Prisma.Decimal(updateReportDto.pressaoTDDepois) : null;
    if (updateReportDto.desgasteTDAntes !== undefined) dataToUpdate.desgasteTDAntes = updateReportDto.desgasteTDAntes ? new Prisma.Decimal(updateReportDto.desgasteTDAntes) : null;
    if (updateReportDto.desgasteTDDepois !== undefined) dataToUpdate.desgasteTDDepois = updateReportDto.desgasteTDDepois ? new Prisma.Decimal(updateReportDto.desgasteTDDepois) : null;

    if (updateReportDto.tamanhoMolaDE !== undefined) dataToUpdate.tamanhoMolaDE = updateReportDto.tamanhoMolaDE ? new Prisma.Decimal(updateReportDto.tamanhoMolaDE) : null;
    if (updateReportDto.tamanhoMolaDD !== undefined) dataToUpdate.tamanhoMolaDD = updateReportDto.tamanhoMolaDD ? new Prisma.Decimal(updateReportDto.tamanhoMolaDD) : null;
    if (updateReportDto.tamanhoMolaTE !== undefined) dataToUpdate.tamanhoMolaTE = updateReportDto.tamanhoMolaTE ? new Prisma.Decimal(updateReportDto.tamanhoMolaTE) : null;
    if (updateReportDto.tamanhoMolaTD !== undefined) dataToUpdate.tamanhoMolaTD = updateReportDto.tamanhoMolaTD ? new Prisma.Decimal(updateReportDto.tamanhoMolaTD) : null;

    // Handle checklistItems update: this is more complex.
    // For many-to-many, typically you would delete existing relations and then recreate them.
    // For simplicity, let's assume if checklistItems is provided, we overwrite existing ones.
    // Or, if not provided, existing ones remain unchanged.
    if (checklistItems !== undefined) {
      // First, delete existing checklist items for this report
      await this.prisma.reportChecklistItem.deleteMany({
        where: { reportId: id },
      });
      // Then, create new ones
      if (checklistItems.length > 0) {
        dataToUpdate.checklistItems = {
          createMany: {
            data: checklistItems.map(item => ({
              checklistItemId: item.checklistItemId,
              status: item.status,
            })),
          },
        };
      }
    }

    return this.prisma.testeReport.update({
      where: { id },
      data: dataToUpdate,
    });
  }

  remove(id: number) {
    return this.prisma.testeReport.delete({ where: { id } });
  }

  async findByCarroId(carroId: number) {
    const reports = await this.prisma.testeReport.findMany({
      where: { carroId },
      orderBy: { dataTeste: 'desc' }, // Order by most recent test date
    });
    return reports;
  }
}
