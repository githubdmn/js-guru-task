import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { IsEmail, IsString } from 'class-validator';

export default class CreateUserResponse {
  @ApiProperty({})
  @Exclude()
  id: number;

  @ApiProperty({})
  @IsString({ always: false })
  userId: string;

  @ApiProperty({})
  @IsString()
  email: string;

  @ApiProperty({})
  @IsString()
  firstName: string;

  @ApiProperty({})
  @IsEmail()
  lastName: string;

  @ApiProperty({})
  @IsEmail()
  phone: string;

  @Exclude()
  @IsString()
  password: string;
}
