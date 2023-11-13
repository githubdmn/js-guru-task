import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export default class CreateProductRequest {
  @IsString()
  @IsOptional()
  userId: string;

  @ApiProperty({})
  @IsString()
  name: string;

  @ApiProperty({})
  @IsString()
  description: string;

  @ApiProperty({})
  @IsNumber()
  price: number;

  @ApiProperty({})
  @IsNumber()
  quantity: number;
}
