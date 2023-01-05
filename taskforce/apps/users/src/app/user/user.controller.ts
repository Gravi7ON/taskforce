import { Body, Controller, Get, Param, Patch, UseGuards } from '@nestjs/common';
import { fillObject } from '@taskforce/core';
import { UserRole } from '@taskforce/shared-types';
import { CustomerUserRdo } from './rdo/customer-user.rdo';
import { PerformerUserRdo } from './rdo/performer-user.rdo';
import { UserService } from './user.service';
import { EditProfileDto } from './dto/edit-profile.dto';
import { EditUserRdo } from './rdo/edit-user.rdo';
import { MongoidValidationPipe } from '../pipes/mongoid-validation.pipe';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findUser(@Param('id', MongoidValidationPipe) id: string) {
    const existedUser = await this.userService.findUser(id)

    if (existedUser.role === UserRole.Performer) {
      return fillObject(PerformerUserRdo, existedUser)
    }

    return fillObject(CustomerUserRdo, existedUser)
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async editProfile(
    @Param('id', MongoidValidationPipe) id: string,
    @Body() dto: EditProfileDto
  ) {
    const existedUser = await this.userService.editProfile(id, dto);
    return fillObject(EditUserRdo, existedUser);
  }
}
