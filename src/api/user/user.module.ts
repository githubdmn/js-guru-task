import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserEntity } from '@/entities';
import { TypeOrmModule } from '@nestjs/typeorm';
import { USER_SERVICE } from '@/constants/instances.constants';
import { JwtModule } from '@nestjs/jwt';

const Services = [
  {
    provide: USER_SERVICE,
    useClass: UserService,
  },
];

@Module({
  controllers: [UserController],
  providers: [...Services],
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    JwtModule.registerAsync({
      useFactory: async () => ({
        secret: 'secret',
        signOptions: {
          expiresIn: '60s',
        },
      }),
    }),
  ],
  exports: [...Services],
})
export class UserModule {}
