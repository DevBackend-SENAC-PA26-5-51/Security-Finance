import { Module } from '@nestjs/common';
import { ClienteService } from './cliente.service.js';
import { ClienteController } from './cliente.controller.js';

@Module({
  providers: [ClienteService],
  controllers: [ClienteController],
  exports: [ClienteService], 
})
export class ClienteModule {}
