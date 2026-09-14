import {
  IsNotEmpty,
  IsString,
  IsEmail,
  Matches,
  IsDateString,
  IsNumber,
  MaxLength,
  MinLength
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreateFuncionarioDto {

  @ApiProperty({
    description: 'Nome completo do funcionário.',
    example: 'Maria Silva',
  })
  @IsNotEmpty({ message: 'O nome é obrigatório.' })
  @IsString({ message: 'O nome deve ser uma string válida.' })
  nome: string;

  @ApiProperty({
    description: 'CPF com 11 dígitos, somente números.',
    example: '12345678901',
    minLength: 11,
    maxLength: 11,
  })
  @IsNotEmpty({ message: 'O CPF é obrigatório.' })
  @MaxLength(11)
  @MinLength(11)
  CPF: string;

  @ApiProperty({
    description: 'Data de nascimento no formato YYYY-MM-DD.',
    example: '1990-05-20',
    format: 'date',
  })
  @IsNotEmpty({ message: 'A data de nascimento é obrigatória.' })
  @IsDateString({}, { message: 'A data de nascimento deve estar no formato válido (ex: YYYY-MM-DD).' })
  data_nascimento: string;

  @ApiProperty({
    description: 'Cargo/função do funcionário.',
    example: 'Analista Financeiro',
  })
  @IsNotEmpty({ message: 'O cargo é obrigatório.' })
  @IsString({ message: 'O cargo deve ser uma string válida.' })
  cargo: string;

  @ApiProperty({
    description: 'E-mail único usado também no login.',
    example: 'maria.silva@securityfinance.com',
    format: 'email',
  })
  @IsNotEmpty({ message: 'O e-mail é obrigatório.' })
  @IsEmail({}, { message: 'Formato de e-mail inválido.' })
  email: string;

  @ApiProperty({
    description: 'Senha em texto plano. Será salva com hash bcrypt.',
    example: 'Senha@123',
    format: 'password',
  })
  @IsNotEmpty({ message: 'A senha é obrigatória.' })
  @IsString({ message: 'A senha deve ser uma string válida.' })
  senha: string;

  @ApiProperty({
    description: 'Data de admissão no formato YYYY-MM-DD.',
    example: '2024-01-15',
    format: 'date',
  })
  @IsNotEmpty({ message: 'A data de admissão é obrigatória.' })
  @IsDateString({}, { message: 'A data de admissão deve estar no formato válido (ex: YYYY-MM-DD).' })
  data_admissao: string;

  @ApiProperty({
    description: 'Telefone no formato (00) 00000-0000.',
    example: '(11) 98765-4321',
  })
  @IsNotEmpty({ message: 'O telefone é obrigatório.' })
  @Matches(
    /^\(\d{2}\)\s?\d{4,5}-\d{4}$/,
    { message: 'O telefone deve estar no formato (00) 00000-0000.' }
  )
  telefone: string;

  @ApiProperty({
    description: 'ID do endereço vinculado (tabela de endereços).',
    example: 1,
  })
  @IsNotEmpty({ message: 'O ID do endereço é obrigatório.' })
  @Type(() => Number)
  @IsNumber({}, { message: 'O ID do endereço deve ser um número válido.' })
  Enderecos_Clientes_ID: number;

  constructor(
    nome: string, 
    CPF: string, 
    data_nascimento: string, 
    cargo: string, 
    email: string, 
    senha: string, 
    data_admissao: string, 
    telefone: string, 
    Enderecos_Clientes_ID: number
  ) {
        this.nome = nome;
        this.CPF = CPF;
        this.data_nascimento = data_nascimento;
        this.cargo = cargo;
        this.email = email;
        this.senha = senha;
        this.data_admissao = data_admissao;
        this.telefone = telefone;
        this.Enderecos_Clientes_ID = Enderecos_Clientes_ID;
  }
}