import { Body, Controller, Get, HttpStatus, Patch, Post, Query, Request, UseGuards } from '@nestjs/common';
import { ApiBadRequestResponse, ApiBearerAuth, ApiConflictResponse, ApiNotFoundResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { createFailedSchemaResponse, fillObject } from '@taskforce/core';
import { JwtAuthGuard } from '../task/guards/jwt-auth.guard';
import { RolesGuard } from '../task/guards/user-role.guard';
import { CreateRespondDto } from './dto/create-response.dto';
import { PerformerMessageException } from './performer.constant';
import { PerformerService } from './performer.service';
import { PerformerRdo } from './rdo/performer.rdo';

@ApiTags('Performer')
@Controller('performer')
export class PerformerController {
  constructor(
    private readonly performerService: PerformerService
  ) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth()
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Respond has been successfully created',
    type: PerformerRdo
  })
  @ApiNotFoundResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Not found such task',
    schema: createFailedSchemaResponse(HttpStatus.NOT_FOUND, PerformerMessageException.NotFound)
  })
  @ApiConflictResponse({
    status: HttpStatus.CONFLICT,
    description: 'Bad data',
    content: {
      "application/json": {
        examples: {
          onlyNewRespond: {
            summary: 'Only new respond',
            value: {
              "statusCode": 409,
              "message": `${PerformerMessageException.OnlyNew}`,
              "error": "Conflict"
            }
          },
          alreadyExists: {
            summary: 'Already respond',
            value: {
              "statusCode": 409,
              "message": `${PerformerMessageException.Exists}`,
              "error": "Conflict"
            }
          }
        }
      }
    }
  })
  @Post('/')
  async createRespond(@Body() dto: CreateRespondDto, @Request() req) {
    const newTaskRespond = await this.performerService.createRespond({...dto, userId: req.user.id});

    return fillObject(PerformerRdo, newTaskRespond);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth()
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'You have successfully rejected respond',
    type: PerformerRdo
  })
  @ApiNotFoundResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Not found task for respond',
    schema: createFailedSchemaResponse(HttpStatus.NOT_FOUND, PerformerMessageException.NotFound)
  })
  @ApiBadRequestResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Already reject',
    schema: createFailedSchemaResponse(HttpStatus.BAD_REQUEST, PerformerMessageException.AlreadyReject)
  })
  @Patch('/')
  async rejectRespond(@Body() dto: CreateRespondDto, @Request() req) {
    const newTaskRespond = await this.performerService.rejectRespond({...dto, userId: req.user.id});

    return fillObject(PerformerRdo, newTaskRespond);
  }

  @Get('responds')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'List of performer responds',
    type: [PerformerRdo]
  })
  async findUserResponds(@Query() query) {
    const userResponds = await this.performerService.findUserRespond(query);

    return fillObject(PerformerRdo, userResponds);
  }
}
