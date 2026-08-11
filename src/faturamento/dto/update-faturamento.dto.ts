import { PartialType } from '@nestjs/mapped-types';
import { CreateFaturamentoDto } from './create-faturamento.dto.js';

export class UpdateFaturamentoDto extends PartialType(CreateFaturamentoDto) {}
