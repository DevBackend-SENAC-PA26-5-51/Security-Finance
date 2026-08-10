import { Body, Controller, Post } from '@nestjs/common';

import { AutenticacaoService } from './autenticacao.service.js';
import { LoginDto } from './dto/login.dto.js';

@Controller('autenticacao')
export class AutenticacaoController {
  constructor(
    private readonly autenticacaoService: AutenticacaoService,
  ) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.autenticacaoService.login(
      loginDto.email,
      loginDto.senha,
    );
  }
}