import { Body, Controller, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { AutenticacaoService } from './autenticacao.service.js';
import { LoginDto } from './dto/login.dto.js';
import { Autenticacao } from './entities/autenticacao.entity.js';

@ApiTags('Autenticação')
@Controller('autenticacao')
export class AutenticacaoController {
  constructor(
    private readonly autenticacaoService: AutenticacaoService,
  ) {}

  @Post('login')
  @ApiOperation({
    summary: 'Realizar login',
    description:
      'Autentica um **cliente ou funcionário** pelo e-mail + senha e retorna um token JWT (expira em 1h). ' +
      'Use o token nas rotas 🔒 via botão **Authorize** (`Bearer <token>`). O payload contém `{ sub, email, tipo }`.',
  })
  @ApiBody({ type: LoginDto })
  @ApiCreatedResponse({
    description: 'Login realizado. Retorna o access_token JWT.',
    type: Autenticacao,
  })
  @ApiUnauthorizedResponse({
    description: 'E-mail ou senha inválidos.',
    schema: {
      example: {
        message: 'Email ou senha inválidos',
        error: 'Unauthorized',
        statusCode: 401,
      },
    },
  })
  @ApiBadRequestResponse({
    description: 'Falha de validação (e-mail inválido ou campos ausentes).',
  })
  async login(@Body() loginDto: LoginDto) {
    return this.autenticacaoService.login(
      loginDto.email,
      loginDto.senha,
    );
  }
}
