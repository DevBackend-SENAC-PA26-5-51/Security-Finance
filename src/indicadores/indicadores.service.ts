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

  async findAll() {
    let totalPagamento = await this.prisma.pagamentos.aggregate({
      _sum: {
        valor: true
      }
    });

    const totalPgto = totalPagamento._sum.valor ?? 0;

    const estornos =
      await this.prisma.pagamentos.aggregate({
        _sum: {
          valor: true,
        },
        where: {
          Estornos: {
           Status: 'Aprovado',
          },
        },
      });

    const totalEstornos = estornos._sum.valor ?? 0;

    const Saldoatual = totalPgto - totalEstornos;
    


    let quantidaeTrasacao = await this.prisma.historico_de_transacao.aggregate({
      _count: {
        ID: true
      }
    });

    const qtdTransacao = quantidaeTrasacao._count.ID;


    return {
      totalPgto,
      totalEstornos,
      Saldoatual,
      qtdTransacao
    }
  }

  async resumo() {
    const entradas = await this.prisma.historico_de_transacao.aggregate({
      _sum: {
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

  async movimentacaoPorMes() {
    // agrupamento mensal
    const entradas = await this.prisma.$queryRaw<
      {
        mes: string;
        total: number;
      }[]
    >`
    SELECT
    DATE_FORMAT(datahora_pagamento, '%Y-%m') AS mes,
    COALESCE(SUM(valor), 0) AS total
  FROM Pagamentos
  WHERE status = 'Pago'
    AND datahora_pagamento IS NOT NULL
  GROUP BY DATE_FORMAT(datahora_pagamento, '%Y-%m')
  ORDER BY mes;
  `;
    // Saidas agrupadas por mês
    const saidas = await this.prisma.$queryRaw<
      {
        mes: string;
        total: number;
      }[]
    >`
        SELECT
        DATE_FORMAT(datahora_pagamento, '%Y-%m') AS mes,
        COALESCE(SUM(valor), 0) AS total
      FROM Pagamentos'
      WHERE status = 'Pago'
        AND datahora_pagamento IS NOT NULL
      GROUP BY DATE_FORMAT(datahora_pagamento, '%Y-%m')
      ORDER BY mes;
    `;
    // Junta todos os meses existentes
    const meses = new Set([
      ...entradas.map((item) => item.mes),
      ...saidas.map((item) => item.mes),
    ]);

    // Monta o resultado final
    return Array.from(meses)
      .sort()
      .map((mes) => {
        const entrada =
          entradas.find((item) => item.mes === mes)?.total ?? 0;

        const saida =
          saidas.find((item) => item.mes === mes)?.total ?? 0;

        return {
          mes,
          entradas: Number(entrada),
          saidas: Number(saida),
          saldo: Number(entrada) - Number(saida),
        };
      });
  }
  async dashboard() {
    const resumo = await this.resumo();
    const porMes = await this.movimentacaoPorMes();

    return {
      resumo,
      porMes,
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
