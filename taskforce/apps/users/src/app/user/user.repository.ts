import { CRUDRepository } from '@taskforce/core';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '@taskforce/shared-types';
import { UserEntity } from './user.entity';
import { UserModel } from './user.model';

@Injectable()
export class UserRepository implements CRUDRepository<UserEntity, string, User> {
  constructor(
    @InjectModel(UserModel.name) private readonly userModel: Model<UserModel>) {
  }

  public async create(item: UserEntity): Promise<User> {
    const createdDate = new Date().toISOString();
    const user = {
      ...item,
      createdAt: createdDate,
      updatedAt: createdDate
    }
    const newUser = new this.userModel(user)

    return newUser.save();
  }

  public async destroy(id: string): Promise<void> {
    this.userModel.deleteOne({_id: id});
  }

  public async findById(id: string): Promise<User | null> {
    return this.userModel
      .findOne({_id: id})
      .exec();
  }

  public async findByEmail(email: string): Promise<User | null> {
    return this.userModel
      .findOne({email})
      .exec();
  }

  public async update(id: string, item: UserEntity): Promise<User> {
    return this.userModel
      .findByIdAndUpdate(id, {
        ...item.toObject(),
        updatedAt: new Date().toISOString()
      }, {new: true})
      .exec();
  }

  public async addReview(id: string, item: UserEntity, recomputedRating: number): Promise<User> {
    return this.userModel
      .findByIdAndUpdate(id, {
        ...item.toObject(),
        updatedAt: new Date().toISOString(),
        rating: recomputedRating
      }, {new: true})
      .exec();
  }
}
