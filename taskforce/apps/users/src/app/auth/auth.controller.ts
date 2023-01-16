import { Body, Controller, HttpCode, HttpStatus, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiConflictResponse, ApiNotFoundResponse, ApiParam, ApiResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { createFailedSchemaResponse, fillObject } from '@taskforce/core';
import { MongoidValidationPipe } from '../pipes/mongoid-validation.pipe';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { CreatedUserRdo } from './rdo/created-user.rdo';
import { LoggedUserRdo } from './rdo/logged-user.rdo';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { AuthUserMessageException } from './auth.constant';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService
  ) {}

  @Post('register')
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The new user has been successfully created',
    type: CreatedUserRdo
  })
  @ApiConflictResponse({
    status: HttpStatus.CONFLICT,
    description: 'User with this email already exists',
    schema: createFailedSchemaResponse(HttpStatus.CONFLICT, AuthUserMessageException.Exists)
  })
  async create(@Body() dto: CreateUserDto) {
    const newUser = await this.authService.register(dto);

    return fillObject(CreatedUserRdo, newUser);
  }

  @Post('login')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The user has been successfully logged',
    type: LoggedUserRdo
  })
  @ApiNotFoundResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'User not found',
    schema: createFailedSchemaResponse(HttpStatus.NOT_FOUND, AuthUserMessageException.NotFound)
  })
  @ApiUnauthorizedResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'User password is wrong',
    schema: createFailedSchemaResponse(HttpStatus.UNAUTHORIZED, AuthUserMessageException.PasswordWrong)
  })
  @HttpCode(HttpStatus.OK)
  async login(@Body() dto: LoginUserDto) {
    const user = await this.authService.verifyUser(dto);

    return this.authService.loginUser(user);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @ApiBearerAuth()
  @ApiParam({
    name: 'id',
    description: 'Unique user id',
    example: '63b70e3f56e71b45d3d73049'
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The user has been successfully update password',
    type: LoggedUserRdo
  })
  @ApiNotFoundResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'User not found',
    schema: createFailedSchemaResponse(HttpStatus.NOT_FOUND, AuthUserMessageException.NotFound)
  })
  @ApiUnauthorizedResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'User password is wrong',
    schema: createFailedSchemaResponse(HttpStatus.UNAUTHORIZED, AuthUserMessageException.NotFound)
  })
  async updatePassword(
    @Param('id', MongoidValidationPipe) id: string,
    @Body() dto: UpdatePasswordDto,
  ) {
    await this.authService.updatePassword(id, dto);
  }
}
