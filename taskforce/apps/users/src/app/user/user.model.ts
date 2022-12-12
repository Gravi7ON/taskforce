import { Document } from 'mongoose';
import { User, UserCity, UserRole } from '@taskforce/shared-types';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  collection: 'users',
})
export class UserModel extends Document implements User {
  @Prop()
  public _id: string;

  @Prop({
    required: true
  })
  public name: string;

  @Prop({
    required: true,
    unique: true
  })
  public email: string;

  @Prop({
    required: true,
    type: String,
    enum: UserCity
  })
  public city: UserCity;

  @Prop({
    required: true
  })
  public passwordHash: string;

  @Prop({
    required: true,
    type: String,
    enum: UserRole,
    default: UserRole.Performer
  })
  public role: UserRole;

  @Prop({
    default: 'unknown.jpg'
  })
  public avatar: string;

  @Prop({
    required: true
  })
  public dateBirth: Date;

  @Prop()
  public createdAt: Date;

  @Prop()
  public updatedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(UserModel);
