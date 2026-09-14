import { PartialType } from '@nestjs/swagger';
import { CreateAutenticacaoDto } from './create-autenticacao.dto.js';

export class UpdateAutenticacaoDto extends PartialType(CreateAutenticacaoDto) {}
