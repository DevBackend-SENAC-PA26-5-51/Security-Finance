import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { PrismaModule } from './prisma/prisma.module.js';
import { MovimentacoesModule } from './movimentacoes/movimentacoes.module.js';

@Module({
  imports: [PrismaModule, MovimentacoesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
