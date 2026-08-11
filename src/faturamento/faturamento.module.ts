import { Module } from '@nestjs/common';
import { FaturamentoService } from './faturamento.service.js';
import { FaturamentoController } from './faturamento.controller.js';

@Module({
  controllers: [FaturamentoController],
  providers: [FaturamentoService],
})
export class FaturamentoModule {}
