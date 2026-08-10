import {
  Controller,
  Get,
  Query,
} from '@nestjs/common';

import { FuncionarioService } from './funcionario.service.js';

@Controller('funcionarios')
export class FuncionarioController {
  constructor(
    private readonly funcionarioService: FuncionarioService,
  ) {}

  @Get('buscar')
  async buscar(@Query('email') email: string) {
    return this.funcionarioService.buscarPorEmail(email);
  }
}