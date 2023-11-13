import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export default class CreateProductResponse {
  @ApiProperty({})
  @IsString()
  name: string;

  @ApiProperty({})
  @IsString()
  productId: string;

  @ApiProperty({})
  @IsString()
  description: string;

  @ApiProperty({})
  @IsString()
  userId: string;

  @ApiProperty({})
  @IsNumber()
  price: number;

  @ApiProperty({})
  @IsNumber()
  quantity: number;
}
