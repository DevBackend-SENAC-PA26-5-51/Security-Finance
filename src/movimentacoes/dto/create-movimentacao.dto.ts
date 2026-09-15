import { IsNumber, IsOptional, IsString, IsDateString } from 'class-validator';

export class CreateMovimentacaoDto {
  @IsNumber()
  valor!: number;

  @IsOptional()
  @IsString()
  descricao?: string;

  @IsOptional()
  @IsString()
  metodo_pagamentos?: string;

  @IsNumber()
  Cliente_ID!: number;
}