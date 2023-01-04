import { Injectable } from '@nestjs/common';
import * as dayjs from 'dayjs';
import { User } from '@taskforce/shared-types';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from '../user/user.entity';
import { LoginUserDto } from './dto/login-user.dto';
import { UserRepository } from '../user/user.repository';
import { UpdatePasswordDto } from './dto/update-password.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
  ) {}

  async register(dto: CreateUserDto) {
    const user: User = {
      ...dto,
      dateBirth: dayjs(dto.dateBirth).toDate()
    }

    const existUser = await this.userRepository.findByEmail(user.email)

    if (existUser) {
      throw new Error('User with this email already existed')
    }

    const userEntity = await new UserEntity(user)
      .hashPassword(user.passwordHash)

    return this.userRepository.create(userEntity);
  }

  async verifyUser(dto: LoginUserDto) {
    const {email, passwordHash} = dto;
    const existUser = await this.userRepository.findByEmail(email);

    if (!existUser) {
      throw new Error(`User with this email doesn't exist`);
    }

    const userEntity = new UserEntity(existUser);

    if (!await userEntity.comparePassword(passwordHash)) {
      throw new Error('User password is wrong');
    }

    return userEntity.toObject();
  }

  async updatePassword(id: string, dto: UpdatePasswordDto) {
    const existUser = await this.userRepository.findById(id);

    if (!existUser) {
      throw new Error(`User with this id doesn't exist`)
    }

    const userEntity = new UserEntity(existUser);

    const isCorrectCurrentPassword = await userEntity.comparePassword(dto.currentPassword);

    if (isCorrectCurrentPassword) {
      await userEntity.hashPassword(dto.newPassword);
      await this.userRepository.update(id, userEntity)

      return userEntity;
    }

    throw new Error('The current password doesn\'t correct');
  }
}
