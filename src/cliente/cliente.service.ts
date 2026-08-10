import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class ClienteService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async buscarPorEmail(email: string) {
    return this.prisma.cliente.findFirst({
      where: {
        email: email,
      },
    });
  }
}