import { Module } from '@nestjs/common';
import { UserModule } from '@/api/user/user.module';
import { ProductModule } from '@/api/product/product.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { env } from './conf';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      schema: 'public',
      database: env.pgdb,
      host: env.host,
      port: env.pgport,
      username: env.pguser,
      password: env.pgpassword,
      synchronize: true,
      entities: ['dist/src/entities/*.entity.{ts,js}'],
    }),
    UserModule, ProductModule
  ]
})
export class AppModule {}
