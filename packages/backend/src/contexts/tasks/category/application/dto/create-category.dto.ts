import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({
    description: 'Nombre de la categoría',
    example: 'Trabajo',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Color de la categoría en formato hexadecimal',
    example: '#FF5733',
    required: false,
  })
  @IsString()
  @IsOptional()
  color?: string;
}
