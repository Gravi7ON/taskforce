import { Injectable } from '@nestjs/common';
import { UpdatePasswordDto } from './dto/update-password-user.dto';
import { UserMemoryRepository } from './user-memory.repository';
import { UserEntity } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    private readonly userMemoryRepository: UserMemoryRepository
  ) {}

  async findUser(id: string) {
    const existUser = await this.userMemoryRepository.findById(id);

    if (!existUser) {
      throw new Error(`User with this id doesn't exist`)
    }

    return existUser;
  }

  async updatePassword(id: string, dto: UpdatePasswordDto) {
    const existUser = await this.userMemoryRepository.findById(id);

    if (!existUser) {
      throw new Error(`User with this id doesn't exist`)
    }

    const userEntity = new UserEntity(existUser);

    const isCorrectCurrentPassword = await userEntity.comparePassword(dto.currentPassword);

    if (isCorrectCurrentPassword) {
      await userEntity.hashPassword(dto.newPassword);
      await this.userMemoryRepository.update(id, userEntity)

      return userEntity;
    }

    throw new Error('The current password doesn\'t correct');
  }
}
