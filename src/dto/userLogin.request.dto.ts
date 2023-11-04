
import { IsEmail, IsString } from 'class-validator';

export default class UserLoginRequest {
	@IsEmail()
	email: string;
	@IsString()
	password: string;
}