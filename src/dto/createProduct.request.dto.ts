import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export default class CreateProductRequest {
  @IsString()
  @IsOptional()
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
