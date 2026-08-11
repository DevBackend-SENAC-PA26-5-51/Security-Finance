import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { PrismaModule } from './prisma/prisma.module.js';
import { IndicadoresModule } from './indicadores/indicadores.module.js';

@Module({
  imports: [PrismaModule, IndicadoresModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
