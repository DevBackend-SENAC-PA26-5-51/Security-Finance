import {
  Controller,
  Get,
  Query,
} from '@nestjs/common';

import { ClienteService } from './cliente.service.js';

@Controller('clientes')
export class ClienteController {
  constructor(
    private readonly clienteService: ClienteService,
  ) {}

  @Get('buscar')
  async buscar(@Query('email') email: string) {
    return this.clienteService.buscarPorEmail(email);
  }
}
