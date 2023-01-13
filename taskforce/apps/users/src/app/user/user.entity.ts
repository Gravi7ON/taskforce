import { User, UserCity, UserRole } from '@taskforce/shared-types';
import { genSalt, compare, hash } from 'bcrypt';
import { EditProfileDto } from './dto/edit-profile.dto';

const SALT_ROUNDS = 10;

export class UserEntity implements User {
  public _id: string;
  public name: string;
  public email: string;
  public city: UserCity;
  public passwordHash: string;
  public role: UserRole;
  public avatar?: string;
  public dateBirth: Date;
  public aboutMyself?: string;
  public specialization?: string[];
  public sendNotify?: boolean;

  constructor(user: User) {
    this.fillEntity(user);
  }

  public toObject() {
    return {
      ...this
    }
  }

  public async hashPassword(password: string): Promise<UserEntity> {
    const salt = await genSalt(SALT_ROUNDS);
    this.passwordHash = await hash(password, salt);

    return this;
  }

  public async comparePassword(password: string): Promise<boolean> {
    return compare(password, this.passwordHash)
  }

  public fillEntity(user: User) {
    this._id = user._id;
    this.name = user.name;
    this.email = user.email;
    this.city = user.city;
    this.passwordHash = user.passwordHash;
    this.role = user.role;
    this.avatar = user.avatar ?? 'unknown.jpg';
    this.dateBirth = user.dateBirth;
    this.aboutMyself = user.aboutMyself ?? '';
    this.specialization = user.specialization ?? [];
    this.sendNotify = user.sendNotify ?? false;
  }

  public updateEntity(dto: EditProfileDto) {
    this.name = dto.name ?? this.name;
    this.city = dto.city ?? this.city;
    this.dateBirth = dto.dateBirth ?? this.dateBirth;
    this.aboutMyself = dto.aboutMyself ?? this.aboutMyself;
    this.specialization = [...new Set(dto.specialization)]
      .slice(0, 5) ?? this.specialization;
  }
}
