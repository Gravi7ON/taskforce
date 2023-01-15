import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { Performer, TaskStatus } from '@taskforce/shared-types';
import { CreateRespondDto } from './dto/create-response.dto';
import { PerformerMessageException } from './performer.constant';
import { PerformerEntity } from './performer.entity';
import { PerformerRepository } from './performer.repository';

@Injectable()
export class PerformerService {
  constructor(
    private readonly performerRepository: PerformerRepository
  ) {}

  async createRespond(dto: CreateRespondDto): Promise<Performer> {
    const existTask = await this.performerRepository.findTask(dto);

    if (!existTask) {
      throw new NotFoundException(PerformerMessageException.NotFound);
    }

    if (existTask.status !== TaskStatus.New) {
      throw new ConflictException(PerformerMessageException.OnlyNew);
    }

    const existRespond = await this.performerRepository.find(dto);

    if (existRespond) {
      throw new ConflictException(PerformerMessageException.Exists);
    }

    const newPerformerEntity = new PerformerEntity(dto);

    return this.performerRepository.create(newPerformerEntity.toObject());
  }

  async rejectRespond(dto: CreateRespondDto): Promise<Performer> {
    const existTask = await this.performerRepository.findTask(dto);

    if (!existTask) {
      throw new NotFoundException(PerformerMessageException.NotFound);
    }

    const existRespond = await this.performerRepository.find(dto);

    if (!existRespond) {
      throw new ConflictException(PerformerMessageException.ForbiddenReject);
    }

    if (!existRespond.assignee) {
      throw new ConflictException(PerformerMessageException.NotReject);
    }

    if (!existRespond.ready) {
      throw new BadRequestException(PerformerMessageException.AlreadyReject)
    }

    const rejectedRespond = await this.performerRepository.update({...existRespond, ...dto});
    await this.performerRepository.updateTaskStatus(dto);
    return rejectedRespond;
  }

  async findUserRespond(query) {
    return this.performerRepository.findAll(query);
  }
}
