
import { IsString } from 'class-validator';

export default class UserLoginResponse {
	@IsString()
	accessToken: string;
	@IsString()
	refreshToken: string;
	@IsString()
	id: number;
}