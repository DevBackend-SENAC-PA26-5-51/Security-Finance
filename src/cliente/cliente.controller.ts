import {
  Controller,
  Get,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { ClienteService } from './cliente.service.js';
import { JwtAuthGuard } from '../autenticacao/guards/jwt-auth.guard.js';

@ApiTags('Clientes')
@Controller('clientes')
export class ClienteController {
  constructor(
    private readonly clienteService: ClienteService,
  ) {}

  @Get('buscar')
  @ApiOperation({
    summary: 'Buscar cliente por e-mail',
    description:
      'Retorna o cliente correspondente ao e-mail informado via query string. ' +
      'Rota pública, usada pelo fluxo de login e por telas de pesquisa.',
  })
  @ApiQuery({
    name: 'email',
    required: true,
    description: 'E-mail do cliente a ser buscado.',
    example: 'cliente@exemplo.com',
  })
  @ApiOkResponse({
    description: 'Cliente encontrado (ou `null` se não existir).',
    schema: {
      example: {
        ID: 1,
        CPF: '12345678901',
        nome: 'João Souza',
        data_nascimento: '1992-08-10',
        email: 'cliente@exemplo.com',
        telefone: '(11) 98765-4321',
      },
    },
  })
  @ApiNotFoundResponse({ description: 'Cliente não encontrado.' })
  async buscar(@Query('email') email: string) {
    return this.clienteService.buscarPorEmail(email);
  }

  // TODO: REATIVAR JWT — guard desativado temporariamente
  // @UseGuards(JwtAuthGuard)
  @Get('privada')
  // @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    summary: 'Rota privada de teste (clientes) — JWT desativado temporariamente',
    description:
      'JWT **desativado temporariamente**: acesso liberado sem `Authorization`. ' +
      'Para reativar, descomente `@UseGuards(JwtAuthGuard)` e `@ApiBearerAuth`.',
  })
  @ApiOkResponse({
    description: 'Acesso liberado (JWT desativado).',
    schema: { example: { mensagem: 'Você está autenticado!' } },
  })
  // @ApiUnauthorizedResponse({
  //   description: 'Token ausente, inválido ou expirado.',
  // })
  async rotaPrivada() {
    return {
      mensagem: 'Você está autenticado!',
    };
  }
}
