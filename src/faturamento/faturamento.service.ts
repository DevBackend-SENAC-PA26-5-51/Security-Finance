import { Injectable } from '@nestjs/common';
import { CreateFaturamentoDto } from './dto/create-faturamento.dto.js';
import { UpdateFaturamentoDto } from './dto/update-faturamento.dto.js';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class FaturamentoService {
  constructor(private prisma: PrismaService){}

  create(createFaturamentoDto: CreateFaturamentoDto) {
    return 'This action adds a new faturamento';
  }

  findAll() {
      return this.prisma.$queryRaw`
        SELECT
          EXTRACT(YEAR FROM data_faturamento) AS ano,
          EXTRACT(MONTH FROM data_faturamento) AS mes,
          SUM(valor) AS total
        FROM Faturamento
        GROUP BY
          EXTRACT(YEAR FROM data_faturamento),
          EXTRACT(MONTH FROM data_faturamento)
        ORDER BY
          ano,
          mes;
      `;
  }

  findOne(id: number) {
    return `This action returns a #${id} faturamento`;
  }

  update(id: number, updateFaturamentoDto: UpdateFaturamentoDto) {
    return `This action updates a #${id} faturamento`;
  }

  remove(id: number) {
    return `This action removes a #${id} faturamento`;
  }
}
