import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { Task } from '@taskforce/shared-types';
import { MAX_TAGS, TAGS_NOT_VALID } from '../task/task.constant';

@Injectable()
export class CheckAndLowercaseTagPipe implements PipeTransform {
  transform(value: Task, { type }: ArgumentMetadata) {
    if (type !== 'body') {
      throw new Error('This pipe must used only with body contains tags!')
    }

    if (!value.tags) {
      return value;
    }

    const spreadUniqueTags = [
      ...new Set(
        value.tags.split(/(#[a-zа-я0-9]+)/gi)
          .filter(Boolean)
      )
    ];

    if (spreadUniqueTags.length > MAX_TAGS) {
      throw new BadRequestException(TAGS_NOT_VALID)
    }

    const tagsStartWithChar = [...spreadUniqueTags].filter(tag => /[a-zа-я]/i.test(tag[1]));

    if (tagsStartWithChar.length !== spreadUniqueTags.length) {
      throw new BadRequestException(TAGS_NOT_VALID)
    }

    const validLengthTags = [...tagsStartWithChar]
      .map(tag => tag.replace('#', ''))
      .filter(tag => tag.length >= 3 && tag.length <= 10);

    if (validLengthTags.length !== tagsStartWithChar.length) {
      throw new BadRequestException(TAGS_NOT_VALID)
    }

    value.tags = spreadUniqueTags.join('').toLowerCase();

    return value;
  }
}
