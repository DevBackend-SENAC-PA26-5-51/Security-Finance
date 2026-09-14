import { PartialType } from '@nestjs/swagger';
import { CreateFaturamentoDto } from './create-faturamento.dto.js';

export class UpdateFaturamentoDto extends PartialType(CreateFaturamentoDto) {}
