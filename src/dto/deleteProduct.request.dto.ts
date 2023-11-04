import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export default class DeleteProductRequest {
  @IsString()
  @IsNotEmpty()
  userId: string;
  @IsNumber()
  id: number;
}
