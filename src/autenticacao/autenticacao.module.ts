import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { AutenticacaoController } from './autenticacao.controller.js';
import { AutenticacaoService } from './autenticacao.service.js';

import { ClienteModule } from '../cliente/cliente.module.js';
import { FuncionarioModule } from '../funcionario/funcionario.module.js';

@Module({
  imports: [
    ClienteModule,
    FuncionarioModule,

    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: '1h',
      },
    }),
  ],

  controllers: [AutenticacaoController],

  providers: [AutenticacaoService],

  exports: [AutenticacaoService],
})
export class AutenticacaoModule {}