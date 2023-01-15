import { Body, Controller, Get, Param, Patch, Post, Request, UseGuards } from '@nestjs/common';
import { fillObject } from '@taskforce/core';
import { UserRole } from '@taskforce/shared-types';
import { CustomerUserRdo } from './rdo/customer-user.rdo';
import { PerformerUserRdo } from './rdo/performer-user.rdo';
import { UserService } from './user.service';
import { EditProfileDto } from './dto/edit-profile.dto';
import { EditUserRdo } from './rdo/edit-user.rdo';
import { MongoidValidationPipe } from '../pipes/mongoid-validation.pipe';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UserReviewDto } from './dto/user-review.dto';
import { AddReviewRdo } from './rdo/add-review.rdo';
import { OnlyCustomerGuard } from './guards/only-customer.guard';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findUser(@Param('id', MongoidValidationPipe) id: string, @Request() req) {
    const existedUser = await this.userService.findUser(id, req)

    if (existedUser.role === UserRole.Performer) {
      return fillObject(PerformerUserRdo, existedUser)
    }

    return fillObject(CustomerUserRdo, existedUser)
  }

  @UseGuards(JwtAuthGuard, OnlyCustomerGuard)
  @Post('review/:id')
  async reviewUser(@Param('id', MongoidValidationPipe) id: string, @Body() dto: UserReviewDto, @Request() req) {
    const userReview = await this.userService.reviewUser(id, dto, req.user);

    return fillObject(AddReviewRdo, userReview);
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
