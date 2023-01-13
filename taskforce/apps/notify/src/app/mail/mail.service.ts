import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { Subscriber } from '@taskforce/shared-types';
import { NotifySubject } from './mail.constant';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  public async sendNotifyNewSubscriber(subscriber: Subscriber) {
    await this.mailerService.sendMail({
      to: subscriber.email,
      subject: NotifySubject.EmailAdd,
      template: './add-subscriber',
      context: {
        user: subscriber.name,
        email: subscriber.email
      }
    })
  }

  public async sendNotifyNewTask(subscriber: Subscriber, {taskAmount}) {
    await this.mailerService.sendMail({
      to: subscriber.email,
      subject: NotifySubject.NewTask,
      template: './send-task',
      context: {
        user: subscriber.name,
        amount: taskAmount
      }
    })
  }
}
