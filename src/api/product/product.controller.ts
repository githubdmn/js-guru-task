import { PRODUCT_SERVICE } from '@/constants/instances.constants';
import { UserGuard } from '@/guard';
import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Request,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { IProduct } from './product.interface';
import {
  CreateProductRequest,
  CreateProductResponse,
  DeleteProductRequest,
} from '@/dto';
import { JwtInterceptor, SerializeExclude } from '@/interceptor';
import { ProductEntity } from '@/entities';

@UseInterceptors(JwtInterceptor)
@UseGuards(UserGuard)
@Controller('product')
export class ProductController {
  constructor(@Inject(PRODUCT_SERVICE) private productService: IProduct) {}

  @Post()
  @SerializeExclude(CreateProductResponse)
  async createProduct(
    @Request() request: any,
    @Body() product: CreateProductRequest,
  ): Promise<ProductEntity> {
    product.userId = request.jwtPayload.sub;
    return await this.productService.createProduct(product);
  }

  @Get(':id')
  @SerializeExclude(CreateProductResponse)
  async getProductById(@Param('id') id: number): Promise<ProductEntity> {
    return await this.productService.getProductById(id);
  }

  @Get()
  @SerializeExclude(CreateProductResponse)
  async getAllProducts(): Promise<ProductEntity[]> {
    return await this.productService.getAllProducts();
  }

  @Delete(':id')
  @SerializeExclude(CreateProductResponse)
  async deleteUserProductByProductId(
    @Request() request: any,
    @Param('id') id: number,
  ): Promise<ProductEntity> {
    const userId = request.jwtPayload.sub;
    return await this.productService.deleteUserProductById(id, userId);
  }
}
