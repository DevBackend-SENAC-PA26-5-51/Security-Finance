import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateMovimentacaoDto } from './dto/create-movimentacao.dto.js';
import { FilterMovimentacaoDto } from './dto/filter-movimentacao.dto.js';

@Injectable()
export class MovimentacoesService {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreateMovimentacaoDto) {
    return this.prisma.historico_de_transacao.create({
      data: {
        valor: dto.valor,
        datahora_transacao: new Date(),
        descricao: dto.descricao,
        metodo_pagamentos: dto.metodo_pagamentos,
        Cliente_ID: dto.Cliente_ID,
      },
    });
  }

  findAll(filter: FilterMovimentacaoDto) {
    const { dataInicio, dataFim } = filter;

    return this.prisma.historico_de_transacao.findMany({
      where: {
        datahora_transacao:
          dataInicio || dataFim
            ? {
                gte: dataInicio ? new Date(dataInicio) : undefined,
                lte: dataFim ? new Date(dataFim) : undefined,
              }
            : undefined,
      },
      orderBy: { datahora_transacao: 'desc' },
    });
  }

  async findOne(id: number) {
    const movimentacao = await this.prisma.historico_de_transacao.findFirst({
      where: { ID: id },
    });

    if (!movimentacao) {
      throw new NotFoundException(`Movimentação com ID ${id} não encontrada.`);
    }

    return movimentacao;
  }

  async calcularSaldo(clienteId: number) {
    const movimentacoes = await this.prisma.historico_de_transacao.findMany({
      where: { Cliente_ID: Number(clienteId) },
    });

    let saldo = 0;

    for (const mov of movimentacoes) {
      saldo += this.valorComSinal(mov);
    }

    return {
      clienteId,
      saldo,
      totalMovimentacoes: movimentacoes.length,
    };
  }

  private valorComSinal(mov: { valor: number | null; descricao: string | null; metodo_pagamentos: string | null }): number {
    const valor = mov.valor ?? 0;
    if (valor < 0) return valor;

    const texto = `${mov.descricao ?? ''} ${mov.metodo_pagamentos ?? ''}`.toLowerCase();
    const termosNegativos = ['pagamento', 'saque', 'debito', 'compra', 'gasto', 'transferencia enviada', 'pix enviado', 'saida'];
    
    const ehNegativo = termosNegativos.some(termo => texto.includes(termo));

    return ehNegativo ? -Math.abs(valor) : Math.abs(valor);
  }
}