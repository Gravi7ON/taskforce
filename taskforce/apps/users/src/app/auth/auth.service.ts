import { ConflictException, Inject, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import * as dayjs from 'dayjs';
import { JwtService } from '@nestjs/jwt';
import { ClientProxy } from '@nestjs/microservices';
import { CommandEvent, User, UserRole } from '@taskforce/shared-types';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from '../user/user.entity';
import { LoginUserDto } from './dto/login-user.dto';
import { UserRepository } from '../user/user.repository';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { AuthUserMessageException, RABBITMQ_SERVICE } from './auth.constant';
import { createEvent } from '@taskforce/core';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
    @Inject(RABBITMQ_SERVICE) private readonly rabbitClient: ClientProxy,
  ) {}

  async register(dto: CreateUserDto) {
    const user: User = {
      ...dto,
      dateBirth: dayjs(dto.dateBirth).toDate()
    };

    const existUser = await this.userRepository.findByEmail(user.email);

    if (existUser) {
      throw new ConflictException(AuthUserMessageException.Exists)
    }

    const userEntity = await new UserEntity(user)
      .hashPassword(user.passwordHash);

    const createdUser = await this.userRepository.create(userEntity);

    if (createdUser.role === UserRole.Performer && createdUser.sendNotify) {
      this.rabbitClient.emit(
        createEvent(CommandEvent.AddSubscriber),
        {
          email: createdUser.email,
          name: createdUser.name
        }
      );
    }

    return createdUser;
  }

  async verifyUser(dto: LoginUserDto) {
    const {email, passwordHash} = dto;
    const existUser = await this.userRepository.findByEmail(email);

    if (!existUser) {
      throw new NotFoundException(AuthUserMessageException.NotFound);
    }

    const userEntity = new UserEntity(existUser);

    if (!await userEntity.comparePassword(passwordHash)) {
      throw new UnauthorizedException(AuthUserMessageException.PasswordWrong);
    }

    return userEntity.toObject();
  }

  async updatePassword(id: string, dto: UpdatePasswordDto) {
    const existUser = await this.userRepository.findById(id);

    if (!existUser) {
      throw new NotFoundException(AuthUserMessageException.NotFound);
    }

    const userEntity = new UserEntity(existUser);

    const isCorrectCurrentPassword = await userEntity.comparePassword(dto.currentPassword);

    if (isCorrectCurrentPassword) {
      await userEntity.hashPassword(dto.newPassword);
      await this.userRepository.update(id, userEntity);

      return userEntity.toObject();
    }

    throw new UnauthorizedException(AuthUserMessageException.PasswordWrong);
  }

  async loginUser(user: User) {
    const payload = {
      sub: user._id,
      email: user.email,
      role: user.role,
      name: user.name
    };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
