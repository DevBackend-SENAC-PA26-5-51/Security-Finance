import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { FaturamentoService } from './faturamento.service.js';
import { CreateFaturamentoDto } from './dto/create-faturamento.dto.js';
import { UpdateFaturamentoDto } from './dto/update-faturamento.dto.js';
import {
  Faturamento,
  FaturamentoMensal,
} from './entities/faturamento.entity.js';

@ApiTags('Faturamento')
@Controller('faturamento')
export class FaturamentoController {
  constructor(private readonly faturamentoService: FaturamentoService) {}

  @Post()
  @ApiOperation({
    summary: 'Criar registro de faturamento',
    description:
      'Cria um registro diário de faturamento `{ data_faturamento, valor }`. ' +
      'A data é única por dia (constraint do banco).',
  })
  @ApiBody({ type: CreateFaturamentoDto })
  @ApiCreatedResponse({ description: 'Registro criado.', type: Faturamento })
  @ApiBadRequestResponse({ description: 'Dados inválidos ou data duplicada.' })
  create(@Body() createFaturamentoDto: CreateFaturamentoDto) {
    return this.faturamentoService.create(createFaturamentoDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Listar faturamento agregado por mês',
    description:
      'Retorna a **soma mensal** do faturamento agrupada por ano/mês, ordenada cronologicamente. ' +
      'Ideal para tabelas e gráficos de barras/linhas no front-end. ' +
      'Exemplo de item: `{ "ano": 2025, "mes": 3, "total": 45230.75 }`.',
  })
  @ApiOkResponse({
    description: 'Totais mensais.',
    type: [FaturamentoMensal],
  })
  findAll() {
    return this.faturamentoService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Buscar faturamento por ID',
    description: 'Retorna um registro específico (scaffold — implementação pendente).',
    deprecated: true,
  })
  @ApiParam({ name: 'id', description: 'ID do registro.', example: 1 })
  @ApiOkResponse({ description: 'Registro encontrado.', type: Faturamento })
  @ApiNotFoundResponse({ description: 'Registro não encontrado.' })
  findOne(@Param('id') id: string) {
    return this.faturamentoService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Atualizar faturamento',
    description: 'Atualização parcial (scaffold — implementação pendente).',
    deprecated: true,
  })
  @ApiParam({ name: 'id', description: 'ID do registro.', example: 1 })
  @ApiBody({ type: UpdateFaturamentoDto })
  @ApiOkResponse({ description: 'Registro atualizado.', type: Faturamento })
  update(@Param('id') id: string, @Body() updateFaturamentoDto: UpdateFaturamentoDto) {
    return this.faturamentoService.update(+id, updateFaturamentoDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Remover faturamento',
    description: 'Exclusão por ID (scaffold — implementação pendente).',
    deprecated: true,
  })
  @ApiParam({ name: 'id', description: 'ID do registro.', example: 1 })
  @ApiOkResponse({ description: 'Registro removido.' })
  remove(@Param('id') id: string) {
    return this.faturamentoService.remove(+id);
  }
}
