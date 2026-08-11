import { Module } from '@nestjs/common';
import { FuncionarioService } from './funcionario.service.js';
import { FuncionarioController } from './funcionario.controller.js';

@Module({
  providers: [FuncionarioService],
  controllers: [FuncionarioController], 
  exports: [FuncionarioService],
})
export class FuncionarioModule {}
