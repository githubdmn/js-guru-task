import { IsEmail, IsString } from 'class-validator';

export default class CreateUserRequest {
  @IsEmail()
  email: string;
  @IsString()
  firstName: string;
  @IsString()
  lastName: string;
  @IsString()
  phone: string;
  @IsString()
  password: string;
}
