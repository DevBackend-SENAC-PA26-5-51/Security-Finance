import { Module } from '@nestjs/common';
import { IndicadoresService } from './indicadores.service.js';
import { IndicadoresController } from './indicadores.controller.js';

@Module({
  controllers: [IndicadoresController],
  providers: [IndicadoresService],
})
export class IndicadoresModule {}
