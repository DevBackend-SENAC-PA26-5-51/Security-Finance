import { Test, TestingModule } from '@nestjs/testing';
import { FuncionarioService } from './funcionario.service.js';

describe('FuncionarioService', () => {
  let service: FuncionarioService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FuncionarioService],
    }).compile();

    service = module.get<FuncionarioService>(FuncionarioService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
