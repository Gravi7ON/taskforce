import { Injectable } from '@nestjs/common';
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
      throw new Error(`User with this id doesn't exist`)
    }

    return existUser;
  }

  async editProfile(id: string, dto: EditProfileDto) {
    const existUser = await this.userRepository.findById(id);

    if (!existUser) {
      throw new Error(`User with this id doesn't exist`)
    }

    const userEntity = new UserEntity(existUser);
    userEntity.updateEntity(dto);

    await this.userRepository.update(id, userEntity)

    return userEntity;
  }
}
