import { CreateProductRequest } from '@/dto';
import { ProductEntity } from '@/entities';
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

  async getProductById(id: number): Promise<ProductEntity> {
    const product = await this.productRepository.findOneBy({ id: id });
    if (!product) throw new Error(`Product with ID ${id} not found`);
    return product;
  }

  async deleteUserProductById(
    id: number,
    userId: string,
  ): Promise<ProductEntity> {
    const product = await this.getProductById(id);
    if (userId !== product.userId)
      throw new Error(
        `Product with ID ${id} cannot be deleted by user with id ${userId}`,
      );
    return await this.productRepository.remove(product);
  }
}
