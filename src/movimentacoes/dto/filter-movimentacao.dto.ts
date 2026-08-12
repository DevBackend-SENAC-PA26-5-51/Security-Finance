import { IsOptional, IsDateString } from 'class-validator';

export class FilterMovimentacaoDto {
  @IsOptional()
  @IsDateString()
  dataInicio?: string;

  @IsOptional()
  @IsDateString()
  dataFim?: string;
}