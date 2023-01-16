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

  async findUser(id: string, req) {
    const existUser = await this.userRepository.findById(id);

    if (!existUser) {
      throw new NotFoundException(UserMessageException.NotFound)
    }

    if (existUser.role === UserRole.Performer) {
      const userResponds = await Promise.all([
        axios.get(`${PERFORMER_URL}?userId=${id}&statusWork=failed`),
        axios.get(`${PERFORMER_URL}?userId=${id}&statusWork=completed`)
      ]);

      const userRespondsFailed = userResponds[0].data.length;
      const userRespondsCompleted = userResponds[1].data.length;
      const userEntity = new UserEntity(existUser).toObject();

      return {
        ...userEntity,
        successedTasks: userRespondsCompleted,
        failedTasks: userRespondsFailed
      }
    }

    const api = axios.create({
      baseURL: `${TASK_URL}/mytask`,
      headers: {'Authorization': `${req.rawHeaders[3]}`}
    });

    const {data: tasks} = await api.get(`/mytask`);

    return {
      ...new UserEntity(existUser).toObject(),
      tasks: tasks?.length,
      newTasks: tasks?.filter(task => task.status === TaskStatus.New).length
    };
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
