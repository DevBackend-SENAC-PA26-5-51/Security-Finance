import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { MovimentacoesService } from './movimentacoes.service.js';
import { CreateMovimentacaoDto } from './dto/create-movimentacao.dto.js';
import { FilterMovimentacaoDto } from './dto/filter-movimentacao.dto.js';

@Controller('movimentacoes')
export class MovimentacoesController {
  constructor(private readonly movimentacoesService: MovimentacoesService) {}

  @Post()
  create(@Body() dto: CreateMovimentacaoDto) {
    return this.movimentacoesService.create(dto);
  }

  @Get()
  findAll(@Query() filter: FilterMovimentacaoDto) {
    return this.movimentacoesService.findAll(filter);
  }

  @Get('saldo/:clienteId')
  calcularSaldo(@Param('clienteId', ParseIntPipe) clienteId: number) {
    return this.movimentacoesService.calcularSaldo(clienteId);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.movimentacoesService.findOne(id);
  }
}