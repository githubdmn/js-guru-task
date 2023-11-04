import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { IUser } from './user.interface';
import utils from '@/utils';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '@/entities';
import { Repository } from 'typeorm';
import { CreateUserRequest } from '@/dto';
import UserLoginRequest from '@/dto/userLogin.request.dto';
import { JwtService } from '@nestjs/jwt';
import UserLoginResponse from '@/dto/userLogin.response.dto';

@Injectable()
export class UserService implements IUser {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private jwtService: JwtService,
  ) {}

  async register(user: CreateUserRequest): Promise<UserEntity> {
    const hashedPassword = await utils.hashString(user.password);
    const newUser = this.userRepository.create({
      ...user,
      password: hashedPassword,
    });

    try {
      const savedUser = await this.userRepository.save(newUser);
      return savedUser;
    } catch (error) {
      throw new HttpException(`${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getAuthenticatedUser(email: string, password: string) {
    const user = await this.userRepository.findOneBy({ email: email });
    if (!user) return false;
    const check = await utils.checkHashedValue(password, user.password);
    if (!check) return false;
    return user;
  }

  async getJwt({
    email,
    password,
  }: UserLoginRequest): Promise<UserLoginResponse> {
    const user = await this.getAuthenticatedUser(email, password);
    if (user) {
      const accessToken = await this.jwtService.signAsync(
        { username: user.email, sub: user.id },
        {
          expiresIn: '1h',
          secret: 'access',
        },
      );
      const refreshToken = await this.jwtService.signAsync(
        { username: user.email, sub: user.id },
        {
          expiresIn: '1d',
          secret: 'refresh',
        },
      );
      return {
        accessToken: accessToken,
        refreshToken: refreshToken,
        id: user.id,
      } as UserLoginResponse;
    } else
      return {
        accessToken: '',
        refreshToken: '',
        id: 0,
      } as UserLoginResponse;
  }
}
