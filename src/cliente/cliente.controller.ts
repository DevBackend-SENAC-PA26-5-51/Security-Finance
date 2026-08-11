import {
  Controller,
  Get,
  Query,
  UseGuards,
} from '@nestjs/common';

import { ClienteService } from './cliente.service.js';
import { JwtAuthGuard } from '../autenticacao/guards/jwt-auth.guard.js';

@Controller('clientes')
export class ClienteController {
  constructor(
    private readonly clienteService: ClienteService,
  ) {}

  @Get('buscar')
  async buscar(@Query('email') email: string) {
    return this.clienteService.buscarPorEmail(email);
  }

  @UseGuards(JwtAuthGuard)
  @Get('privada')
  async rotaPrivada() {
    return {
      mensagem: 'Você está autenticado!',
    };
  }
}