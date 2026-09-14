import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    description: 'E-mail do cliente ou funcionário cadastrado.',
    example: 'funcionario@securityfinance.com',
    format: 'email',
  })
  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @ApiProperty({
    description: 'Senha em texto plano. Será comparada (bcrypt para funcionário).',
    example: 'Senha@123',
    format: 'password',
    minLength: 4,
  })
  @IsString()
  @IsNotEmpty()
  senha!: string;
}