import { Module } from '@nestjs/common';
import { AutenticacaoModule } from './autenticacao/autenticacao.module.js';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { PrismaModule } from './prisma/prisma.module.js';

import { FaturamentoController } from './faturamento/faturamento.controller.js';
import { FaturamentoService } from './faturamento/faturamento.service.js';
import { FaturamentoModule } from './faturamento/faturamento.module.js';

import { ClienteModule } from './cliente/cliente.module.js';
import { FuncionarioModule } from './funcionario/funcionario.module.js';

@Module({
  imports: [PrismaModule, AutenticacaoModule, ClienteModule, FuncionarioModule, FaturamentoModule],

  controllers: [AppController, FaturamentoController],
  providers: [AppService, FaturamentoService],
})
export class AppModule {}
