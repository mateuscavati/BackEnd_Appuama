import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsNumber,
  IsDateString,
  IsString,
  Min,
  Max,
  IsBoolean,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateReportChecklistItemDto {
  @IsInt()
  @IsNotEmpty()
  checklistItemId: number;

  @IsBoolean()
  @IsNotEmpty()
  status: boolean; // true if checked, false if unchecked
}

export class CreateReportDto {
  @IsInt()
  @IsNotEmpty()
  carroId: number;

  @IsInt()
  @IsNotEmpty()
  usuarioId: number;

  @IsOptional()
  @IsInt()
  balanceamentoId?: number;

  @IsOptional()
  @IsString()
  pilotoNome?: string;

  @IsOptional()
  @IsString()
  tipoSessao?: string;

  @IsOptional()
  @IsDateString()
  dataTeste?: string;

  @IsOptional()
  @IsDateString()
  horaInicio?: string;

  @IsOptional()
  @IsDateString()
  horaFim?: string;

  @IsOptional()
  @IsString()
  tempoTotal?: string;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  distanciaPercorrida?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  errosMecanicos?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  errosHumanos?: number;

  @IsOptional()
  @IsString()
  observacoesPiloto?: string;

  // Pneus
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  pressaoDEAntes?: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  pressaoDEDepois?: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  desgasteDEAntes?: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  desgasteDEDepois?: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  pressaoDDAntes?: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  pressaoDDDepois?: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  desgasteDDAntes?: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  desgasteDDDepois?: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  pressaoTEAntes?: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  pressaoTEDepois?: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  desgasteTEAntes?: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  desgasteTEDepois?: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  pressaoTDAntes?: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  pressaoTDDepois?: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  desgasteTDAntes?: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  desgasteTDDepois?: number;

  // Molas
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  tamanhoMolaDE?: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  tamanhoMolaDD?: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  tamanhoMolaTE?: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  tamanhoMolaTD?: number;

  // Balanceamento
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  balanceFrontPercentage?: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  balanceRearPercentage?: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  balanceLeftPercentage?: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  balanceRightPercentage?: number;

  // Checklist Items
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateReportChecklistItemDto)
  checklistItems?: CreateReportChecklistItemDto[];
}
