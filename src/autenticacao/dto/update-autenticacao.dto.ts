import { PartialType } from '@nestjs/mapped-types';
import { CreateAutenticacaoDto } from './create-autenticacao.dto.js';

export class UpdateAutenticacaoDto extends PartialType(CreateAutenticacaoDto) {}
