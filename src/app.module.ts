import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { PrismaModule } from './prisma/prisma.module.js';
import { FaturamentoController } from './faturamento/faturamento.controller.js';
import { FaturamentoService } from './faturamento/faturamento.service.js';
import { FaturamentoModule } from './faturamento/faturamento.module.js';

@Module({
  imports: [PrismaModule, FaturamentoModule],
  controllers: [AppController, FaturamentoController],
  providers: [AppService, FaturamentoService],
})
export class AppModule {}
