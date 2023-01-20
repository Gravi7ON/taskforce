import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus, TokenPayload, UserRole } from '@taskforce/shared-types';
import { EditProfileDto } from './dto/edit-profile.dto';
import { UserReviewDto } from './dto/user-review.dto';
import { UserEntity } from './user.entity';
import { UserRepository } from './user.repository';
import { PERFORMER_URL, TASK_URL, UserMessageException } from './user.constant';
import axios from 'axios';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository
  ) {}

  async findUser(id: string) {
    const existUser = await this.userRepository.findById(id);

    if (!existUser) {
      throw new NotFoundException(UserMessageException.NotFound)
    }

    return existUser;
  }

  async editProfile(id: string, dto: EditProfileDto) {
    const existUser = await this.userRepository.findById(id);

    if (!existUser) {
      throw new NotFoundException(UserMessageException.NotFound)
    }

    const userEntity = new UserEntity(existUser);
    userEntity.updateEntity(dto);

    const updatedUser = await this.userRepository.update(id, userEntity)

    return updatedUser;
  }

  async reviewUser(id: string, {taskId, text, grade}: UserReviewDto, req: TokenPayload) {
    const existUser = await this.userRepository.findById(id);

    if (!existUser) {
      throw new NotFoundException(UserMessageException.NotFound);
    }

    if (existUser.role !== UserRole.Performer) {
      throw new ConflictException(UserMessageException.OnlyPerformer);
    }

    for (const review of existUser.reviews) {
      if (review.customerId === req.id && review.taskId === taskId) {
        throw new ConflictException(UserMessageException.ForbiddenReview);
      }
    }

    const {data: task} = await axios.get(`${TASK_URL}/${taskId}`);

    if (!task) {
      throw new NotFoundException(UserMessageException.TaskNotFound);
    }

    if (task.status !== TaskStatus.Completed) {
      throw new BadRequestException(UserMessageException.OnlyCompleted);
    }

    let isPerformerExecuteTask = false;
    for (const performer of task.performers) {
      if (performer.userId !== id && performer.taskId !== taskId) {
        continue;
      }

      isPerformerExecuteTask = true;
      break;
    }

    if (!isPerformerExecuteTask) {
      throw new ConflictException(UserMessageException.PerformerNotExucute);
    }

    const userEntity = new UserEntity(existUser);
    userEntity.addReview({taskId, text, grade, customerId: req.id});

    const {data: failedTask} = await axios.get(`${PERFORMER_URL}?userId=${id}&statusWork=failed`);
    const recomputedRating = existUser.reviews.reduce((sum, review) => sum += review.grade, 0) / (existUser.reviews.length + failedTask.length);

    return this.userRepository.addReview(id, userEntity, recomputedRating);
  }
}
