import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { PRODUCT_SERVICE } from '@/constants/instances.constants';
import { ProductEntity, UserEntity } from '@/entities';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { JwtInterceptor } from '@/interceptor';

const Services = [
  {
    provide: PRODUCT_SERVICE,
    useClass: ProductService,
  },
];

@Module({
  controllers: [ProductController],
  imports: [TypeOrmModule.forFeature([ProductEntity, UserEntity])],
  providers: [...Services],
  exports: [...Services],
})
export class ProductModule {}
