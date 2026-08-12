import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateFuncionarioDto } from './dto/create-funcionario.dto.js';
import * as bcrypt from 'bcrypt'; 

@Injectable()
export class FuncionarioService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  
  async findAll() {
    return this.prisma.funcionario.findMany();
  }

  async create(createFuncionarioDto: CreateFuncionarioDto) {
    
    const emailExistente = await this.buscarPorEmail(createFuncionarioDto.email);
    if (emailExistente) {
      throw new BadRequestException('Já existe um funcionário cadastrado com este e-mail.');
    }

    
    const hashedPassword = await bcrypt.hash(createFuncionarioDto.senha, 10);
   
    this.prisma.funcionario.create({
      data: {
        nome: createFuncionarioDto.nome,
        CPF: createFuncionarioDto.CPF,
        data_nascimento: new Date(createFuncionarioDto.data_nascimento),
        cargo: createFuncionarioDto.cargo,
        email: createFuncionarioDto.email,
        senha: hashedPassword, 
        data_admissao: new Date(createFuncionarioDto.data_admissao),
        telefone: createFuncionarioDto.telefone,
        Enderecos_Clientes_ID: Number(createFuncionarioDto.Enderecos_Clientes_ID),
        ativo: 1
      },
    });

    return {
      Mensagem: "Funcionário registrado com sucesso!"
    }
  }

  async buscarPorEmail(email: string) {
    return this.prisma.funcionario.findFirst({
      where: {
        email: email,
      },
    });
  }
}