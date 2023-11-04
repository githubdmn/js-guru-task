import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export default class CreateProductRequest {
  @IsString()
  @IsNotEmpty()
  userId: string;
  @IsString()
  name: string;
  @IsString()
  description: string;
  @IsNumber()
  price: number;
  @IsNumber()
  quantity: number;
}
