import { Test, TestingModule } from '@nestjs/testing';
import { IndicadoresController } from './indicadores.controller';
import { IndicadoresService } from './indicadores.service';

describe('IndicadoresController', () => {
  let controller: IndicadoresController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IndicadoresController],
      providers: [IndicadoresService],
    }).compile();

    controller = module.get<IndicadoresController>(IndicadoresController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
