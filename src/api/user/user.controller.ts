import {
  Body,
  Controller,
  Get,
  Post,
  Res,
  Headers,
  Inject,
  UseGuards,
} from '@nestjs/common';
import { IUser } from './user.interface';
import { USER_SERVICE } from '@/constants/instances.constants';
import { SerializeExclude } from '@/interceptor';
import { CreateUserRequest, CreateUserResponse } from '@/dto';
import User from '@/entities/user.entity';
import UserLoginRequest from '@/dto/userLogin.request.dto';
import { UserGuard } from '@/guard';

@UseGuards(UserGuard)
@Controller('user')
export class UserController {
  constructor(@Inject(USER_SERVICE) private userService: IUser) {}

  @Post()
  @SerializeExclude(CreateUserResponse)
  async register(@Body() user: CreateUserRequest): Promise<User> {
    return await this.userService.register(user);
  }

  @Post('login')
  async login(@Body() userLogin: UserLoginRequest, @Res() response: any) {
    const customer = await this.userService.getJwt(userLogin);
    if (customer.id === 0)
      return response.json({ error: 'invalid credentials' });
    return response
      .set('access_token', customer.accessToken)
      .set('refresh_token', customer.refreshToken)
      .json({ id: customer.id });
  }
}
