// src/good-deeds/dto/update-good-deed.dto.ts
import { PartialType } from '@nestjs/swagger';
import { CreateGoodDeedDto } from './create-good-deed.dto';

export class UpdateGoodDeedDto extends PartialType(CreateGoodDeedDto) {}
