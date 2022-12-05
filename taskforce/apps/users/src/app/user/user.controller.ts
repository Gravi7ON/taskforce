import { Body, Controller, Get, Param, Patch } from '@nestjs/common';
import { fillObject } from '@taskforce/core';
import { UserRole } from '@taskforce/shared-types';
import { UpdatePasswordDto } from './dto/update-password-user.dto';
import { CreatedUserRdo } from '../auth/rdo/created-user.rdo';
import { CustomerUserRdo } from './rdo/customer-user.rdo';
import { PerformerUserRdo } from './rdo/performer-user.rdo';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService
  ) {}

  @Get(':id')
  async findUser(@Param('id') id: string) {
    const existedUser = await this.userService.findUser(id);

    if (existedUser.role === UserRole.Performer) {
      return fillObject(PerformerUserRdo, existedUser)
    }

    return fillObject(CustomerUserRdo, existedUser)
  }

  @Patch(':id')
  async updatePassword(
    @Param('id') id: string,
    @Body() dto: UpdatePasswordDto
  ) {
    const existedUser = await this.userService.updatePassword(id, dto);
    return fillObject(CreatedUserRdo, existedUser);
  }
}
