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
import { Type } from 'class-transformer';

export class CreateFuncionarioDto {
  
  @IsNotEmpty({ message: 'O nome é obrigatório.' })
  @IsString({ message: 'O nome deve ser uma string válida.' })
  nome: string;

  @IsNotEmpty({ message: 'O CPF é obrigatório.' })
  @MaxLength(11)
  @MinLength(11)
  CPF: string;

  @IsNotEmpty({ message: 'A data de nascimento é obrigatória.' })
  @IsDateString({}, { message: 'A data de nascimento deve estar no formato válido (ex: YYYY-MM-DD).' })
  data_nascimento: string; 

  @IsNotEmpty({ message: 'O cargo é obrigatório.' })
  @IsString({ message: 'O cargo deve ser uma string válida.' })
  cargo: string;

  @IsNotEmpty({ message: 'O e-mail é obrigatório.' })
  @IsEmail({}, { message: 'Formato de e-mail inválido.' })
  email: string;

  @IsNotEmpty({ message: 'A senha é obrigatória.' })
  @IsString({ message: 'A senha deve ser uma string válida.' })
  senha: string;

  @IsNotEmpty({ message: 'A data de admissão é obrigatória.' })
  @IsDateString({}, { message: 'A data de admissão deve estar no formato válido (ex: YYYY-MM-DD).' })
  data_admissao: string; 

  @IsNotEmpty({ message: 'O telefone é obrigatório.' })
  @Matches(
    /^\(\d{2}\)\s?\d{4,5}-\d{4}$/, 
    { message: 'O telefone deve estar no formato (00) 00000-0000.' }
  )
  telefone: string;

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