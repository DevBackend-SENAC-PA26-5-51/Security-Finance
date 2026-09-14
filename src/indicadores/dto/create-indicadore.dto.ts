import { ApiProperty } from '@nestjs/swagger';

/**
 * DTO de criação de indicador.
 *
 * Hoje os indicadores são **calculados automaticamente** pelo back-end
 * (agregações de Pagamentos / Histórico de transações).
 * Este DTO existe para compatibilidade do scaffold CRUD e evolução futura.
 */
export class CreateIndicadoreDto {
  @ApiProperty({
    description: 'Nome/chave do indicador (uso futuro).',
    example: 'saldo_mensal',
    required: false,
  })
  nome?: string;

  @ApiProperty({
    description: 'Valor do indicador (uso futuro).',
    example: 1500.75,
    required: false,
  })
  valor?: number;
}
