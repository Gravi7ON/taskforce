import { Injectable, NotFoundException } from '@nestjs/common';
import { AUTH_USER_NOT_FOUND } from '../auth/auth.constant';
import { EditProfileDto } from './dto/edit-profile.dto';
import { UserEntity } from './user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository
  ) {}

  async findUser(id: string) {
    const existUser = await this.userRepository.findById(id);

    if (!existUser) {
      throw new NotFoundException(AUTH_USER_NOT_FOUND)
    }

    return existUser;
  }

  async editProfile(id: string, dto: EditProfileDto) {
    const existUser = await this.userRepository.findById(id);

    if (!existUser) {
      throw new NotFoundException(AUTH_USER_NOT_FOUND)
    }

    const userEntity = new UserEntity(existUser);
    userEntity.updateEntity(dto);

    await this.userRepository.update(id, userEntity)

    return userEntity;
  }
}
