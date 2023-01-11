import { plainToInstance, ClassConstructor } from 'class-transformer';
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
