import { Module } from '@nestjs/common';
import { AutenticacaoModule } from './autenticacao/autenticacao.module.js';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { PrismaModule } from './prisma/prisma.module.js';
import { IndicadoresModule } from './indicadores/indicadores.module.js';

import { FaturamentoModule } from './faturamento/faturamento.module.js';

import { ClienteModule } from './cliente/cliente.module.js';
import { FuncionarioModule } from './funcionario/funcionario.module.js';

@Module({    
  imports: [PrismaModule, AutenticacaoModule, ClienteModule, FuncionarioModule, FaturamentoModule, IndicadoresModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
