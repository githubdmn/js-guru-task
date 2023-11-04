import { Exclude } from 'class-transformer';
import { IsEmail, IsString } from 'class-validator';

export default class CreateUserResponse {
	@Exclude()
	id: number;
	@IsString({ always: false })
	userId: string;
	@IsString()
	email: string;
	@IsString()
	firstName: string;
	@IsEmail()
	lastName: string;
	@IsEmail()
	phone: string;
	@Exclude()
	@IsString()
	password: string;
}