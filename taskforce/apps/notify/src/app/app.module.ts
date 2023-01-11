import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NOTIFY_SERVICE_ENV_PATH } from './app.constant';
import { getMongoDbConfig, mongoDbOptions } from '../config/mongodb.config';
import { validateEnvironments } from './env.validation';
import { rabbitMqOptions } from '../config/rabbitmq.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      envFilePath: NOTIFY_SERVICE_ENV_PATH,
      load: [mongoDbOptions, rabbitMqOptions],
      validate: validateEnvironments,
    }),
    MongooseModule.forRootAsync(getMongoDbConfig()),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
