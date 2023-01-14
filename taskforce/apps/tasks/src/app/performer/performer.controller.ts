import { Body, Controller, Patch, Post, Request, UseGuards } from '@nestjs/common';
import { fillObject } from '@taskforce/core';
import { JwtAuthGuard } from '../task/guards/jwt-auth.guard';
import { RolesGuard } from '../task/guards/user-role.guard';
import { CreateRespondDto } from './dto/create-response.dto';
import { PerformerService } from './performer.service';
import { PerformerRdo } from './rdo/performer.rdo';

@Controller('performer')
export class PerformerController {
  constructor(
    private readonly performerService: PerformerService
  ) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('/')
  async createRespond(@Body() dto: CreateRespondDto, @Request() req) {
    const newTaskRespond = await this.performerService.createRespond({...dto, userId: req.user.id});

    return fillObject(PerformerRdo, newTaskRespond);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch('/')
  async rejectRespond(@Body() dto: CreateRespondDto, @Request() req) {
    const newTaskRespond = await this.performerService.rejectRespond({...dto, userId: req.user.id});

    return fillObject(PerformerRdo, newTaskRespond);
  }
}
