import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { FuncionarioService } from './funcionario.service.js';
import { JwtAuthGuard } from '../autenticacao/guards/jwt-auth.guard.js';
import { CreateFuncionarioDto } from './dto/create-funcionario.dto.js'; // Ajuste o caminho se necessário

@ApiTags('Funcionários')
@Controller('funcionarios')
export class FuncionarioController {
  constructor(
    private readonly funcionarioService: FuncionarioService,
  ) { }

  @Get()
  @ApiOperation({
    summary: 'Listar funcionários',
    description: 'Retorna todos os funcionários cadastrados.',
  })
  @ApiOkResponse({
    description: 'Lista de funcionários.',
    schema: {
      example: [
        {
          ID: 1,
          nome: 'Maria Silva',
          CPF: '12345678901',
          cargo: 'Analista Financeiro',
          email: 'maria.silva@securityfinance.com',
          telefone: '(11) 98765-4321',
          data_admissao: '2024-01-15',
          ativo: 1,
        },
      ],
    },
  })
  findAll() {
    return this.funcionarioService.findAll();
  }

  @Post()
  @ApiOperation({
    summary: 'Cadastrar funcionário',
    description:
      'Cria um funcionário. O e-mail deve ser único e a senha é armazenada com hash bcrypt. ' +
      'Telefone no formato `(00) 00000-0000`, datas como `YYYY-MM-DD`.',
  })
  @ApiBody({ type: CreateFuncionarioDto })
  @ApiCreatedResponse({
    description: 'Funcionário registrado.',
    schema: { example: { Mensagem: 'Funcionário registrado com sucesso!' } },
  })
  @ApiBadRequestResponse({
    description: 'E-mail duplicado ou falha de validação.',
    schema: {
      example: {
        message: 'Já existe um funcionário cadastrado com este e-mail.',
        error: 'Bad Request',
        statusCode: 400,
      },
    },
  })
  create(@Body() createFuncionarioDto: CreateFuncionarioDto) {
    return this.funcionarioService.create(createFuncionarioDto);
  }

  @Get('buscar')
  @ApiOperation({
    summary: 'Buscar funcionário por e-mail',
    description:
      'Retorna o funcionário correspondente ao e-mail. Útil para telas de pesquisa e para o login.',
  })
  @ApiQuery({
    name: 'email',
    required: true,
    description: 'E-mail do funcionário.',
    example: 'maria.silva@securityfinance.com',
  })
  @ApiOkResponse({
    description: 'Funcionário encontrado (ou `null`).',
    schema: {
      example: {
        ID: 1,
        nome: 'Maria Silva',
        email: 'maria.silva@securityfinance.com',
        cargo: 'Analista Financeiro',
      },
    },
  })
  async buscar(@Query('email') email: string) {
    return this.funcionarioService.buscarPorEmail(email);
  }

  // TODO: REATIVAR JWT — guard desativado temporariamente
  // @UseGuards(JwtAuthGuard)
  @Get('privada')
  // @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    summary: 'Rota privada de teste (funcionários) — JWT desativado temporariamente',
    description:
      'JWT **desativado temporariamente**: acesso liberado sem `Authorization`. ' +
      'Para reativar, descomente `@UseGuards(JwtAuthGuard)` e `@ApiBearerAuth`.',
  })
  @ApiOkResponse({
    description: 'Acesso liberado (JWT desativado).',
    schema: {
      example: { mensagem: 'Você está autenticado como funcionário!' },
    },
  })
  // @ApiUnauthorizedResponse({
  //   description: 'Token ausente, inválido ou expirado.',
  // })
  async rotaPrivada() {
    return {
      mensagem: 'Você está autenticado como funcionário!',
    };
  }
}
