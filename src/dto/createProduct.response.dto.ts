import { IsNumber, IsString } from 'class-validator';

export default class CreateProductResponse {
  @IsString()
  name: string;
  @IsString()
  description: string;
  @IsNumber()
  price: number;
  @IsNumber()
  quantity: number;
}
