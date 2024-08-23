import { IsString, IsEmail, IsNotEmpty, MinLength, IsOptional } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateUserDto {
    @ApiProperty({
        description: 'The username of the user',
        example: 'johndoe'
    })
    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    username: string;

    @ApiProperty({
        description: 'The email of the user',
        example: 'john@example.com'
    })
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty({
        description: 'The password of the user',
        example: 'password123'
    })
    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    password: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {
    @ApiProperty({
        description: 'The new password of the user',
        example: 'newpassword123'
    })
    @IsOptional()
    @IsString()
    @MinLength(6)
    newPassword?: string;

    @ApiProperty({
        description: 'The unique friend tag of the user',
        example: '@johndoe'
    })
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    friendTag?: string;
}
