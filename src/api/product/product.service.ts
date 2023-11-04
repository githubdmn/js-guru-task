import { CreateProductRequest, CreateProductResponse } from '@/dto';
import { ProductEntity, UserEntity } from '@/entities';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private productRepository: Repository<ProductEntity>,
  ) {}

  async createProduct(product: CreateProductRequest): Promise<ProductEntity> {
    const created = await this.productRepository.create(product);
    return await this.productRepository.save(created);
  }

  async getAllProducts(): Promise<ProductEntity[]> {
    return await this.productRepository.find();
  }

  async getProductById(productId: string): Promise<CreateProductResponse> {
    const product = await this.productRepository.findOneBy({
      productId: productId,
    });
    if (!product) throw new Error(`Product with ID ${productId} not found`);
    const user = product?.userId;
    return this.mapProduct(product, user as unknown as UserEntity);
  }

  async deleteUserProductById(
    productId: string,
    userId: string,
  ): Promise<ProductEntity> {
    const product = await this.productRepository.findOneBy({
      productId: productId,
    });
    if (!product) throw new Error(`Product is not found`);
    const extractedUserId = this.extractUserId(
      product?.userId as unknown as UserEntity,
    );
    if (userId !== extractedUserId)
      throw new Error(
        `Product with ID ${productId} cannot be deleted by user with id ${userId}`,
      );
    return await this.productRepository.remove(product);
  }

  private mapProduct(
    product: ProductEntity,
    user: UserEntity,
  ): CreateProductResponse {
    return {
      productId: product.productId,
      description: product.description,
      name: product.name,
      price: product.price,
      quantity: product.quantity,
      userId: user.userId,
    };
  }

  private extractUserId(user: UserEntity): string {
    return user.userId;
  }
}
