import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export default class CreateUserRequest {
  @ApiProperty({})
  @IsEmail()
  email: string;

  @ApiProperty({})
  @IsString()
  firstName: string;

  @ApiProperty({})
  @IsString()
  lastName: string;

  @ApiProperty({})
  @IsString()
  phone: string;

  @ApiProperty({})
  @IsString()
  password: string;
}
