import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString, IsUUID } from 'class-validator';

export class UpdateTodoDto {
  @ApiPropertyOptional({
    description: 'Título de la tarea',
    example: 'Comprar pan',
  })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiPropertyOptional({
    description: 'Descripción de la tarea',
    example: 'Comprar pan en la tienda cercana',
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({
    description: 'Estado de la tarea',
    example: true,
  })
  @IsBoolean()
  @IsOptional()
  completed?: boolean;

  @ApiPropertyOptional({
    description: 'Fecha límite de la tarea (ISO 8601)',
    example: '2026-09-15T10:00:00.000Z',
  })
  @IsOptional()
  dueDate?: string | null;

  @ApiPropertyOptional({
    description: 'ID de la categoría asociada a la tarea (null para quitarla)',
    example: 'b3f1c2e0-1234-4a5b-9c6d-7e8f9a0b1c2d',
  })
  @IsUUID()
  @IsOptional()
  categoryId?: string | null;
}
