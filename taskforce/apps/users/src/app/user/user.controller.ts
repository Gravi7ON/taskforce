import { Body, Controller, Get, HttpStatus, Param, Patch, Post, Request, UseGuards } from '@nestjs/common';
import { ApiBadRequestResponse, ApiBearerAuth, ApiConflictResponse, ApiNotFoundResponse, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { createfailedSchemaResponse, createSchemaUserInfoResponse, fillObject } from '@taskforce/core';
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
import { UserMessageException } from './user.constant';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService
  ) {}

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiNotFoundResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'User not found',
    schema: createfailedSchemaResponse(HttpStatus.NOT_FOUND, UserMessageException.NotFound)
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
  @Get(':id')
  async findUser(@Param('id', MongoidValidationPipe) id: string, @Request() req) {
    const existedUser = await this.userService.findUser(id, req)

    if (existedUser.role === UserRole.Performer) {
      return fillObject(PerformerUserRdo, existedUser)
    }

    return fillObject(CustomerUserRdo, existedUser)
  }

  @UseGuards(JwtAuthGuard, OnlyCustomerGuard)
  @ApiBearerAuth()
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Create review for performer',
    type: AddReviewRdo
  })
  @ApiNotFoundResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Not found',
    content: {
      "application/json": {
        examples: {
          userNotFound: {
            summary: 'User not found',
            value: {
              "statusCode": 404,
              "message": `${UserMessageException.NotFound}`,
              "error": "Not Found"
            }
          },
          taskNotFound: {
            summary: 'Task not found',
            value: {
              "statusCode": 404,
              "message": `${UserMessageException.TaskNotFound}`,
              "error": "Not Found"
            }
          }
        }
      }
    }
  })
  @ApiConflictResponse({
    status: HttpStatus.CONFLICT,
    description: 'Conflict',
    content: {
      "application/json": {
        examples: {
          userNotPerformer: {
            summary: 'Not performer',
            value: {
              "statusCode": 409,
              "message": `${UserMessageException.OnlyPerformer}`,
              "error": "Conflict"
            }
          },
          onlySelfTaskReview: {
            summary: 'Performer not execute task',
            value: {
              "statusCode": 409,
              "message": `${UserMessageException.PerformerNotExucute}`,
              "error": "Conflict"
            }
          },
          onlyOneTimeReview: {
            summary: 'Already review',
            value: {
              "statusCode": 409,
              "message": `${UserMessageException.ForbiddenReview}`,
              "error": "Conflict"
            }
          }
        }
      }
    }
  })
  @ApiBadRequestResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad data',
    content: {
      "application/json": {
        examples: {
          onlyCompleted: {
            summary: 'Only completed task',
            value: {
              "statusCode": 400,
              "message": `${UserMessageException.OnlyCompleted}`,
              "error": "Bad request"
            }
          }
        }
      }
    }
  })
  @ApiParam({
    name: 'id',
    description: 'Unique user id',
    example: '63b70e3f56e71b45d3d73049'
  })
  @Post('review/:id')
  async reviewUser(@Param('id', MongoidValidationPipe) id: string, @Body() dto: UserReviewDto, @Request() req) {
    const userReview = await this.userService.reviewUser(id, dto, req.user);

    return fillObject(AddReviewRdo, userReview);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiNotFoundResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'User not found',
    schema: createfailedSchemaResponse(HttpStatus.NOT_FOUND, UserMessageException.NotFound)
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User info successful update',
    type: EditUserRdo
  })
  @ApiParam({
    name: 'id',
    description: 'Unique user id',
    example: '63b70e3f56e71b45d3d73049'
  })
  @Patch(':id')
  async editProfile(
    @Param('id', MongoidValidationPipe) id: string,
    @Body() dto: EditProfileDto
  ) {
    const existedUser = await this.userService.editProfile(id, dto);
    return fillObject(EditUserRdo, existedUser);
  }
}
