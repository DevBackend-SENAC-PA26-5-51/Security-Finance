import { ApiProperty } from '@nestjs/swagger';

export class Indicadore {
  @ApiProperty({
    description: 'Soma de todos os pagamentos registrados.',
    example: 120000.5,
  })
  totalPgto!: number;

  @ApiProperty({
    description: 'Soma dos pagamentos com estorno aprovado.',
    example: 5000.25,
  })
  totalEstornos!: number;

  @ApiProperty({
    description: 'Saldo atual (totalPgto - totalEstornos).',
    example: 115000.25,
  })
  Saldoatual!: number;

  @ApiProperty({
    description: 'Quantidade de transações no histórico.',
    example: 320,
  })
  qtdTransacao!: number;
}

/** Resumo retornado dentro de GET /indicadores/dashboard. */
export class IndicadoresResumo {
  @ApiProperty({ description: 'Total de entradas.', example: 95000 })
  toatalEntradas!: number;

  @ApiProperty({ description: 'Total de saídas (pagamentos com status Pago).', example: 40000 })
  totalSaidas!: number;

  @ApiProperty({ description: 'Saldo (entradas - saídas).', example: 55000 })
  saldoAtual!: number;

  @ApiProperty({ description: 'Quantidade de transações.', example: 320 })
  quantidadeTransacoes!: number;
}

/** Movimentação de um mês dentro do dashboard. */
export class IndicadoresPorMes {
  @ApiProperty({ description: 'Mês no formato YYYY-MM.', example: '2025-03' })
  mes!: string;

  @ApiProperty({ description: 'Total de entradas no mês.', example: 12000 })
  entradas!: number;

  @ApiProperty({ description: 'Total de saídas no mês.', example: 8000 })
  saidas!: number;

  @ApiProperty({ description: 'Saldo do mês.', example: 4000 })
  saldo!: number;
}

/** Resposta completa de GET /indicadores/dashboard. */
export class IndicadoresDashboard {
  @ApiProperty({ type: IndicadoresResumo })
  resumo!: IndicadoresResumo;

  @ApiProperty({ type: [IndicadoresPorMes] })
  porMes!: IndicadoresPorMes[];
}
