import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { IndicadoresService } from './indicadores.service.js';
import { CreateIndicadoreDto } from './dto/create-indicadore.dto.js';
import { UpdateIndicadoreDto } from './dto/update-indicadore.dto.js';
import {
  Indicadore,
  IndicadoresDashboard,
} from './entities/indicadore.entity.js';

@ApiTags('Indicadores')
@Controller('indicadores')
export class IndicadoresController {
  constructor(private readonly indicadoresService: IndicadoresService) {}

  @Post()
  @ApiOperation({
    summary: 'Criar indicador (reservado)',
    description: 'Scaffold CRUD — os indicadores atuais são calculados automaticamente.',
    deprecated: true,
  })
  @ApiBody({ type: CreateIndicadoreDto })
  @ApiCreatedResponse({ description: 'Indicador criado.' })
  create(@Body() createIndicadoreDto: CreateIndicadoreDto) {
    return this.indicadoresService.create(createIndicadoreDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Obter KPIs financeiros',
    description:
      'Retorna os cartões do dashboard: `totalPgto` (soma de pagamentos), ' +
      '`totalEstornos` (estornos aprovados), `Saldoatual` e `qtdTransacao`.',
  })
  @ApiOkResponse({
    description: 'KPIs calculados.',
    type: Indicadore,
  })
  findAll() {
    return this.indicadoresService.findAll();
  }

  @Get('dashboard')
  @ApiOperation({
    summary: 'Obter dashboard completo',
    description:
      'Retorna `{ resumo, porMes }` para montar o dashboard: ' +
      '`resumo = { toatalEntradas, totalSaidas, saldoAtual, quantidadeTransacoes }` ' +
      'e `porMes = [{ mes: "YYYY-MM", entradas, saidas, saldo }]`. ' +
      '⚠️ Chamar **antes** de `GET /indicadores/:id` — caso contrário "dashboard" será interpretado como ID.',
  })
  @ApiOkResponse({
    description: 'Dados agregados para gráficos.',
    type: IndicadoresDashboard,
  })
  dashboard(){
    return this.indicadoresService.dashboard();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Buscar indicador por ID (reservado)',
    description: 'Scaffold CRUD — sem implementação real no momento.',
    deprecated: true,
  })
  @ApiParam({ name: 'id', description: 'ID do indicador.', example: 1 })
  @ApiOkResponse({ description: 'Indicador encontrado.' })
  findOne(@Param('id') id: string) {
    return this.indicadoresService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Atualizar indicador (reservado)',
    description: 'Scaffold CRUD — sem implementação real no momento.',
    deprecated: true,
  })
  @ApiParam({ name: 'id', description: 'ID do indicador.', example: 1 })
  @ApiBody({ type: UpdateIndicadoreDto })
  @ApiOkResponse({ description: 'Indicador atualizado.' })
  update(@Param('id') id: string, @Body() updateIndicadoreDto: UpdateIndicadoreDto) {
    return this.indicadoresService.update(+id, updateIndicadoreDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Remover indicador (reservado)',
    description: 'Scaffold CRUD — sem implementação real no momento.',
    deprecated: true,
  })
  @ApiParam({ name: 'id', description: 'ID do indicador.', example: 1 })
  @ApiOkResponse({ description: 'Indicador removido.' })
  remove(@Param('id') id: string) {
    return this.indicadoresService.remove(+id);
  }
}
