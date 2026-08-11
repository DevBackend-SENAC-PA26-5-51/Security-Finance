import { Injectable } from '@nestjs/common';
import { CreateIndicadoreDto } from './dto/create-indicadore.dto.js';
import { UpdateIndicadoreDto } from './dto/update-indicadore.dto.js';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class IndicadoresService {
  constructor(private prisma: PrismaService) { }

  create(createIndicadoreDto: CreateIndicadoreDto) {
    return 'This action adds a new indicadore';
  }

  findAll() {
    this.prisma.pagamentos.aggregate({
      _sum: {
        valor: true
      }
    });


  }

  async resumo(){
    const entradas = await this.prisma.historico_de_transacao.aggregate({
      _sum:{
        valor: true
      }
    });

    const saidas = await this.prisma.pagamentos.aggregate({
      _sum: {
        valor: true
      },
      where: {
        status: 'Pago'
      }
    });

    //Quantidade de transações
    const quantidadeTransacoes = await this.prisma.historico_de_transacao.count();

    // Se não existir nenhum valor, considera 0 
    const toatalEntradas = entradas._sum.valor ?? 0;
    const totalSaidas = saidas._sum.valor ?? 0;

    //Saldo atual
    const saldoAtual = toatalEntradas - totalSaidas;

    return {
      toatalEntradas,
      totalSaidas,
      saldoAtual,
      quantidadeTransacoes,
    };
    }

  findOne(id: number) {
    return `This action returns a #${id} indicadore`;
  }

  update(id: number, updateIndicadoreDto: UpdateIndicadoreDto) {
    return `This action updates a #${id} indicadore`;
  }

  remove(id: number) {
    return `This action removes a #${id} indicadore`;
  }
}
