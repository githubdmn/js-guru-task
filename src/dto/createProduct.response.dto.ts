import { Exclude } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';

export default class CreateProductResponse {
  @IsString()
  name: string;
  @IsString()
  productId: string;
  @IsString()
  description: string;
  @IsString()
  userId: string;
  @IsNumber()
  price: number;
  @IsNumber()
  quantity: number;
}
