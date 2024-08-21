import { IsString, IsOptional, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateGoodDeedDto {
    @ApiProperty({ description: 'The title of the good deed' })
    @IsString()
    title: string;

    @ApiProperty({ description: 'The description of the good deed', required: false })
    @IsOptional()
    @IsString()
    description?: string;

    @ApiProperty({ description: 'Whether the good deed is completed', default: false })
    @IsOptional()
    @IsBoolean()
    completed?: boolean;
}

export class UpdateGoodDeedDto extends CreateGoodDeedDto {}
