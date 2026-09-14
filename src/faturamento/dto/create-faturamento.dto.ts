import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsNumber, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateFaturamentoDto {
  @ApiProperty({
    description:
      'Data do faturamento (única por dia). Usada para agrupar o total por mês.',
    example: '2025-03-15',
    format: 'date',
  })
  @IsNotEmpty({ message: 'A data do faturamento é obrigatória.' })
  @IsDateString(
    {},
    { message: 'A data deve estar no formato válido (ex: YYYY-MM-DD).' },
  )
  data_faturamento!: string;

  @ApiProperty({
    description: 'Valor do faturamento em reais.',
    example: 12500.9,
    minimum: 0,
  })
  @Type(() => Number)
  @IsNumber({}, { message: 'O valor deve ser um número válido.' })
  @Min(0, { message: 'O valor não pode ser negativo.' })
  valor!: number;
}
