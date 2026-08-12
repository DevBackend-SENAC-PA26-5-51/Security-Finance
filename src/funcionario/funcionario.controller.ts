import {
  Controller,
  Get,
  Query,
  UseGuards,
} from '@nestjs/common';

import { FuncionarioService } from './funcionario.service.js';
import { JwtAuthGuard } from '../autenticacao/guards/jwt-auth.guard.js';

@Controller('funcionarios')
export class FuncionarioController {
  constructor(
    private readonly funcionarioService: FuncionarioService,
  ) {}

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