import {
  IsBoolean,
  isEnum,
  IsEnum,
  IsMimeType,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { BienStatut } from '../enums/bien-statut';
import { BienDisponible } from '../enums/bien-disponible';

export class CreateBienDto {
  @IsString()
  @IsOptional()
  image: string[];
  @IsString()
  adresse: string;
  @IsNumber()
  prix: number;
  @IsEnum(BienDisponible)
  disponible: BienDisponible;
  @IsString()
  description: string;
  @IsEnum(BienStatut)
  @IsOptional()
  statut: BienStatut;
}
