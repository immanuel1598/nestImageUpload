import { IsOptional, IsString } from 'class-validator';

export class CreateImageDto {
    @IsString()
    @IsOptional()
    images: string[];
}
