import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AddFriendDto {
    @ApiProperty({
        description: 'The unique friend tag of the user to add as a friend',
        example: '@johndoe'
    })
    @IsString()
    @IsNotEmpty()
    friendTag: string;
}
