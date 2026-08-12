import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  UseGuards,
} from '@nestjs/common';

import { FuncionarioService } from './funcionario.service.js';
import { JwtAuthGuard } from '../autenticacao/guards/jwt-auth.guard.js';
import { CreateFuncionarioDto } from './dto/create-funcionario.dto.js'; // Ajuste o caminho se necessário

@Controller('funcionarios')
export class FuncionarioController {
  constructor(
    private readonly funcionarioService: FuncionarioService,
  ) { }

  @Get()
  findAll() {
    return this.funcionarioService.findAll(); 
  }

  @Post()
  create(@Body() createFuncionarioDto: CreateFuncionarioDto) {
    return this.funcionarioService.create(createFuncionarioDto);
  }

  @Get('buscar')
  async buscar(@Query('email') email: string) {
    return this.funcionarioService.buscarPorEmail(email);
  }

  @UseGuards(JwtAuthGuard)
  @Get('privada')
  async rotaPrivada() {
    return {
      mensagem: 'Você está autenticado como funcionário!',
    };
  }
}