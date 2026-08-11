import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { AutenticacaoController } from './autenticacao.controller.js';
import { AutenticacaoService } from './autenticacao.service.js';

import { ClienteModule } from '../cliente/cliente.module.js';
import { FuncionarioModule } from '../funcionario/funcionario.module.js';

import { JwtStrategy } from './strategies/jwt.strategy.js';

@Module({
  imports: [
    ClienteModule,
    FuncionarioModule,

    PassportModule,

    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: '1h',
      },
    }),
  ],

  controllers: [AutenticacaoController],

  providers: [
    AutenticacaoService,
    JwtStrategy,
  ],

  exports: [AutenticacaoService],
})
export class AutenticacaoModule {}