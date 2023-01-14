import { Module } from '@nestjs/common';
import { PerformerService } from './performer.service';
import { PerformerController } from './performer.controller';
import { PerformerRepository } from './performer.repository';

@Module({
  providers: [PerformerService, PerformerRepository],
  controllers: [PerformerController],
})
export class PerformerModule {}
