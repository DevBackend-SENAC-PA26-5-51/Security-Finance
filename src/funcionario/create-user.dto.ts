// create-user.dto.ts
import { 
  IsNotEmpty, 
  IsString, 
  IsEmail, 
  Matches, 
  IsOptional 
} from 'class-validator';

export class CreateUserDto {
  
  
  @IsNotEmpty({ message: 'O nome é obrigatório.' })
  @IsString({ message: 'O nome deve ser uma string válida.' })
  nome!: string;

  @IsNotEmpty({ message: 'O e-mail é obrigatório.' })
  @IsEmail({}, { message: 'Formato de e-mail inválido.' })
  email!: string;

  @IsNotEmpty({ message: 'O CPF é obrigatório.' })
  @Matches(
    /^\d{3}\.\d{3}\.\d{3}-\d{2}$/, 
    { message: 'O CPF deve estar no formato 000.000.000-00.' }
  )
  CPF!: string;

  @IsNotEmpty({ message: 'O telefone é obrigatório.' })
  @Matches(
    /^\(\d{2}\)\s?\d{4,5}-\d{4}$/, 
    { message: 'O telefone deve estar no formato (00) 00000-0000.' }
  )
  telefone!: string;
}