import { PartialType } from '@nestjs/mapped-types';
import { CreateIndicadoreDto } from './create-indicadore.dto.js';

export class UpdateIndicadoreDto extends PartialType(CreateIndicadoreDto) {}
