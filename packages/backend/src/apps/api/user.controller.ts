import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/contexts/identity-access/auth/infrastructure/jwt-auth.guard';
import { CreateUserDto } from 'src/contexts/identity-access/user/application/dto/create-user.dto';
import { UpdateUserDto } from 'src/contexts/identity-access/user/application/dto/update-user.dto';
import { UserService } from 'src/contexts/identity-access/user/application/user.service';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CurrentUser } from 'src/contexts/identity-access/auth/infrastructure/current-user.decorator';

type AuthenticatedUser = { id: string; role: 'CLIENT' | 'ADMIN' };

@ApiTags('Users')
@ApiBearerAuth('jwt')
@UseGuards(JwtAuthGuard)
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiOperation({ summary: 'Obtener todos los usuarios' })
  @ApiOkResponse({ description: 'Lista de usuarios (sin passwords)' })
  async findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un usuario por ID' })
  @ApiParam({ name: 'id', description: 'ID del usuario' })
  @ApiResponse({ status: 200, description: 'Usuario encontrado (sin password)' })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo usuario' })
  @ApiCreatedResponse({ description: 'Usuario creado correctamente' })
  @ApiResponse({ status: 409, description: 'El email ya está en uso' })
  create(@CurrentUser() user: { id: string }, @Body() dto: CreateUserDto) {
    return this.userService.create(dto, user.id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un usuario' })
  @ApiParam({ name: 'id', description: 'ID del usuario' })
  @ApiResponse({ status: 200, description: 'Usuario actualizado' })
  @ApiResponse({
    status: 403,
    description: 'Solo el propio usuario o un admin puede actualizar',
  })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
  update(
    @CurrentUser() currentUser: AuthenticatedUser,
    @Param('id') id: string,
    @Body() dto: UpdateUserDto,
  ) {
    if (currentUser.id !== id && currentUser.role !== 'ADMIN') {
      throw new ForbiddenException(
        'Solo el propio usuario o un admin puede actualizar este usuario',
      );
    }
    return this.userService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un usuario' })
  @ApiParam({ name: 'id', description: 'ID del usuario' })
  @ApiResponse({ status: 200, description: 'Usuario eliminado' })
  @ApiResponse({ status: 403, description: 'Solo un admin puede eliminar' })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
  remove(
    @CurrentUser() currentUser: AuthenticatedUser,
    @Param('id') id: string,
  ) {
    if (currentUser.role !== 'ADMIN') {
      throw new ForbiddenException('Solo un admin puede eliminar usuarios');
    }
    return this.userService.remove(id);
  }
}
