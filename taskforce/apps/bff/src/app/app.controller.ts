import { Controller, Get, Param, UseGuards, Request, HttpStatus } from '@nestjs/common';
import { ApiBearerAuth, ApiNotFoundResponse, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

import { AppService } from './app.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { createFailedSchemaResponse, createSchemaUserInfoResponse, fillObject } from '@taskforce/core';
import { UserRole } from '@taskforce/shared-types';
import { PerformerUserRdo } from './rdo/performer-user.rdo';
import { CustomerUserRdo } from './rdo/customer-user.rdo';

@ApiTags('Auth')
@Controller('bff')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiNotFoundResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'User not found',
    schema: createFailedSchemaResponse(HttpStatus.NOT_FOUND, 'User not found')
  })
  @ApiResponse({
    status:HttpStatus.OK,
    description: 'Info about users',
    content: {
      "application/json": createSchemaUserInfoResponse()
    }
  })
  @ApiParam({
    name: 'id',
    description: 'Unique user id',
    example: '63b70e3f56e71b45d3d73049'
  })
  @Get('user-by-role/:id')
  async findUser(@Param('id') id: string, @Request() req) {
    const existedUser = await this.appService.findUser(id, req)

    if (existedUser.role === UserRole.Performer) {
      return fillObject(PerformerUserRdo, existedUser)
    }

    return fillObject(CustomerUserRdo, existedUser)
  }
}
