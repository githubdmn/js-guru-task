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
import { CreateProductRequest, CreateProductResponse } from '@/dto';
import { JwtInterceptor, SerializeExclude } from '@/interceptor';
import { ProductEntity } from '@/entities';
import {
  ApiTags,
  ApiOperation,
  ApiCreatedResponse,
  ApiUnauthorizedResponse,
  ApiOkResponse,
  ApiNotFoundResponse,
} from '@nestjs/swagger';
@ApiTags('Product')
@UseInterceptors(JwtInterceptor)
@UseGuards(UserGuard)
@Controller('product')
export class ProductController {
  constructor(@Inject(PRODUCT_SERVICE) private productService: IProduct) {}

  @Post()
  @ApiOperation({ summary: 'Create a new product' })
  @ApiCreatedResponse({ type: CreateProductResponse })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  async createProduct(
    @Request() request: any,
    @Body() product: CreateProductRequest,
  ): Promise<ProductEntity> {
    product.userId = request.jwtPayload.sub;
    return await this.productService.createProduct(product);
  }

  @Get(':id')
  @SerializeExclude(CreateProductResponse)
  @ApiOperation({ summary: 'Get a product by ID' })
  @ApiOkResponse({ type: CreateProductResponse })
  @ApiNotFoundResponse({ description: 'Product not found' })
  async getProductById(@Param('id') id: number): Promise<ProductEntity> {
    return await this.productService.getProductById(id);
  }

  @Get()
  @ApiOperation({ summary: 'Get all products' })
  @ApiOkResponse({ type: CreateProductResponse, isArray: true })
  async getAllProducts(): Promise<ProductEntity[]> {
    return await this.productService.getAllProducts();
  }

  @Delete(':id')
  @SerializeExclude(CreateProductResponse)
  @ApiOperation({ summary: 'Delete a product by ID' })
  @ApiOkResponse({ type: CreateProductResponse })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  async deleteUserProductByProductId(
    @Request() request: any,
    @Param('id') id: number,
  ): Promise<ProductEntity> {
    const userId = request.jwtPayload.sub;
    return await this.productService.deleteUserProductById(id, userId);
  }
}
