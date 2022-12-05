import { Body, Controller, Get, HttpCode, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { fillObject } from '@taskforce/core';
import { UserRole } from '@taskforce/shared-types';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { CreatedUserRdo } from './rdo/created-user.rdo';
import { LoggedUserRdo } from './rdo/logged-user.rdo';
import { CustomerUserRdo } from './rdo/customer-user.rdo';
import { PerformerUserRdo } from './rdo/performer-user.rdo';
import { UpdatePasswordDto } from './dto/update-password-user.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService
  ) {}

  @Post('register')
  async create(@Body() dto: CreateUserDto) {
    const newUser = await this.authService.register(dto);
    return fillObject(CreatedUserRdo, newUser);
  }

  @Get(':id')
  async findUser(@Param('id') id: string) {
    const existedUser = await this.authService.findUser(id);

    if (existedUser.role === UserRole.Performer) {
      return fillObject(PerformerUserRdo, existedUser)
    }

    return fillObject(CustomerUserRdo, existedUser)
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() dto: LoginUserDto) {
    const verifiedUser = await this.authService.verifyUser(dto);
    return fillObject(LoggedUserRdo, verifiedUser);
  }

  @Patch(':id')
  async updatePassword(
    @Param('id') id: string,
    @Body() dto: UpdatePasswordDto
  ) {
    const existedUser = await this.authService.updatePassword(id, dto);
    return fillObject(CreateUserDto, existedUser);
  }
}
