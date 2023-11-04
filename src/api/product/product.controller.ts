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
  UseGuards,
} from '@nestjs/common';
import { IProduct } from './product.interface';
import { CreateProductRequest, DeleteProductRequest } from '@/dto';

@UseGuards(UserGuard)
@Controller('product')
export class ProductController {
  constructor(@Inject(PRODUCT_SERVICE) private productService: IProduct) {}

  @Post()
  async createProduct(@Body() product: CreateProductRequest) {
    return await this.productService.createProduct(product);
  }

  @Get(':id')
  async getProductById(@Param('id') id: number) {
    return await this.productService.getProductById(id);
  }

  @Get()
  async getAllProducts() {
    return await this.productService.getAllProducts();
  }

  @Delete(':id')
  async deleteUserProductByProductId(
    @Body() { id, userId }: DeleteProductRequest,
  ) {
    return await this.productService.deleteUserProductById(id, userId);
  }
}
