import { ApiProperty } from '@nestjs/swagger';

export class Autenticacao {
  @ApiProperty({
    description: 'Token JWT (válido por 1h). Enviar como `Bearer <token>`.',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  })
  access_token!: string;
}
