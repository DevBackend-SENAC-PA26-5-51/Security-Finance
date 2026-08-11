import {
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';

import { ClienteService } from '../cliente/cliente.service.js';
import { FuncionarioService } from '../funcionario/funcionario.service.js';

@Injectable()
export class AutenticacaoService {
  constructor(
    private readonly clienteService: ClienteService,
    private readonly funcionarioService: FuncionarioService,
    private readonly jwtService: JwtService,
  ) {}

  async login(email: string, senha: string) {
    const cliente = await this.clienteService.buscarPorEmail(email);

    if (cliente && cliente.senha === senha) {
      return this.gerarToken(
        cliente.ID,
        'cliente',
        cliente.email,
      );
    }

    const funcionario =
      await this.funcionarioService.buscarPorEmail(email);

    if (funcionario && funcionario.senha === senha) {
      return this.gerarToken(
        funcionario.ID,
        'funcionario',
        funcionario.email,
      );
    }

    throw new UnauthorizedException(
      'Email ou senha inválidos',
    );
  }

  private gerarToken(
    id: number,
    tipo: 'cliente' | 'funcionario',
    email: string | null | undefined,
  ) {
    const payload = {
      sub: id,
      email,
      tipo,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}