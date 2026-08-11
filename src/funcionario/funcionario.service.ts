import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class FuncionarioService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async buscarPorEmail(email: string) {
    return this.prisma.funcionario.findFirst({
      where: {
        email: email,
      },
    });
  }
}