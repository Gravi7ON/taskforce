import { Entity } from '@taskforce/core';
import { Subscriber } from '@taskforce/shared-types';

export class EmailSubscriberEntity implements Entity<EmailSubscriberEntity>, Subscriber {
  public id?: string;
  public email: string;
  public name: string;

  constructor(emailSubscriber: Subscriber) {
    this.fillEntity(emailSubscriber);
  }

  public fillEntity(entity) {
    this.email = entity.email;
    this.name = entity.name;
    this.id = entity.id ?? '';
  }

  public toObject(): EmailSubscriberEntity {
    return {...this};
}
  }
