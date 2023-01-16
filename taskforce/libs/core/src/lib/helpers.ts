import { plainToInstance, ClassConstructor } from 'class-transformer';
import { HttpStatus } from '@nestjs/common';
import { CommandEvent } from '@taskforce/shared-types';

export function fillObject<T, V>(someDto: ClassConstructor<T>, plainObject: V) {
  return plainToInstance(someDto, plainObject, {excludeExtraneousValues: true});
}

export function getMongoConnectionString({username, password, host, port, databaseName, authDatabase}): string {
  return `mongodb://${username}:${password}@${host}:${port}/${databaseName}?authSource=${authDatabase}`;
}

export function createEvent(commandEvent: CommandEvent) {
  return {cmd: commandEvent};
}

export function createfailedSchemaResponse(failedCode: number, message: string) {
  if (failedCode === HttpStatus.NOT_FOUND) {
    return {
      properties: {
        statusCode: {
          type: 'number',
          example: 404
        },
        message: {
          type: 'string',
          example: message
        },
        error: {
          type: 'string',
          example: 'Not Found'
        }
      }
    }
  }

  if (failedCode === HttpStatus.UNAUTHORIZED) {
    return {
      properties: {
        statusCode: {
          type: 'number',
          example: 401
        },
        message: {
          type: 'string',
          example: message
        },
        error: {
          type: 'string',
          example: 'Unauthorized'
        }
      }
    }
  }

  return {
    properties: {
      statusCode: {
        type: 'number',
        example: 409
      },
      message: {
        type: 'string',
        example: message
      },
      error: {
        type: 'string',
        example: 'Conflict'
      }
    }
  }
}

export function createSchemaUserInfoResponse() {
  return {
    examples: {
      customer: {
        summary: 'Info about customer',
        value: {
          "id": "63b70e3f56e71b45d3d73049",
          "name": "Chip Hawk",
          "email": "user@user.ru",
          "city": "Москва",
          "role": "Исполнитель",
          "dateRegister": "2023-01-16T12:30:30.578Z",
          "aboutMyself": "I am Groooooooot",
          "tasks": 5,
          "newTasks": 50
        }
      },
      performer: {
        summary: 'Info about performer',
        value: {
          "id": "63b70e3f56e71b45d3d73049",
          "name": "Chip Hawk",
          "email": "user@user.ru",
          "city": "Москва",
          "role": "Исполнитель",
          "registerDate": "2023-01-16T12:34:16.512Z",
          "aboutMyself": "I am Groooooooot",
          "successedTasks": 5,
          "failedTasks": 5,
          "age": 29,
          "rating": 5,
          "specialization": [
            "Строитель"
          ]
        }
      }
    }
  }
}
