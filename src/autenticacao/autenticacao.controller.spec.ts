import { Test, TestingModule } from '@nestjs/testing';
import { AutenticacaoController } from './autenticacao.controller.js';
import { AutenticacaoService } from './autenticacao.service.js';

describe('AutenticacaoController', () => {
  let controller: AutenticacaoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AutenticacaoController],
      providers: [AutenticacaoService],
    }).compile();

    controller = module.get<AutenticacaoController>(AutenticacaoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
