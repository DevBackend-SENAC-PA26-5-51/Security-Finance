import { ApiProperty } from '@nestjs/swagger';

export class Faturamento {
  @ApiProperty({ description: 'ID do registro.', example: 1 })
  id!: number;

  @ApiProperty({
    description: 'Data do faturamento.',
    example: '2025-03-15',
    format: 'date',
  })
  data_faturamento!: Date;

  @ApiProperty({ description: 'Valor em reais.', example: 12500.9 })
  valor!: number;
}

/** Item retornado por GET /faturamento (agregado mensal). */
export class FaturamentoMensal {
  @ApiProperty({ description: 'Ano de referência.', example: 2025 })
  ano!: number;

  @ApiProperty({ description: 'Mês de referência (1-12).', example: 3 })
  mes!: number;

  @ApiProperty({
    description: 'Soma dos valores do mês.',
    example: 45230.75,
  })
  total!: number;
}
