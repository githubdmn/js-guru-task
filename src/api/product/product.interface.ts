import { CreateProductRequest } from '@/dto';
import { ProductEntity } from '@/entities';

export interface IProduct {
  createProduct(product: CreateProductRequest): Promise<ProductEntity>;

  getAllProducts(): Promise<ProductEntity[]>;

  getProductById(id: number): Promise<ProductEntity>;

  deleteUserProductById(id: number, userId: string): Promise<ProductEntity>;
}
