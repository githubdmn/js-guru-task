import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export default class DeleteProductRequest {
  @ApiProperty({})
  @IsString()
  @IsNotEmpty()
  userId: string;

  @ApiProperty({})
  @IsNumber()
  id: number;
}
