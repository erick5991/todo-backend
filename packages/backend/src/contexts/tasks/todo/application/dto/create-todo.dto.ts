import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateTodoDto {
  @ApiProperty({
    description: 'Título de la tarea',
    example: 'Comprar pan',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiPropertyOptional({
    description: 'Descripción de la tarea',
    example: 'Comprar pan en la tienda cercana',
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({
    description: 'Fecha límite de la tarea (ISO 8601)',
    example: '2026-09-15T10:00:00.000Z',
  })
  @IsOptional()
  dueDate?: string;

  @ApiPropertyOptional({
    description: 'ID de la categoría asociada a la tarea',
    example: 'b3f1c2e0-1234-4a5b-9c6d-7e8f9a0b1c2d',
  })
  @IsUUID()
  @IsOptional()
  categoryId?: string;
}
