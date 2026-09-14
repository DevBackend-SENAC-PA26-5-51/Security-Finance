import { PartialType } from '@nestjs/swagger';
import { CreateIndicadoreDto } from './create-indicadore.dto.js';

export class UpdateIndicadoreDto extends PartialType(CreateIndicadoreDto) {}
