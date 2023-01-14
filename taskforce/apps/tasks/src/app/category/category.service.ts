import { Category } from '@taskforce/shared-types';
import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CategoryRepository } from './category.repository';
import { CreateCategoryDto } from './dto/create-category.dto';
import { CategoryEntity } from './category.entity';
import { CategoryExceptionMessage } from './category.constant';

@Injectable()
export class CategoryService {
  constructor(
    private readonly categoryRepository: CategoryRepository
  ) {}

  async createCategory(dto: CreateCategoryDto): Promise<Category> {
    const categoryEntity = new CategoryEntity(dto);
    const existedCategory = this.categoryRepository.findByTitle(dto.title);

    if (existedCategory) {
      throw new ConflictException(CategoryExceptionMessage.ExistsCategory);
    }

    return this.categoryRepository.create(categoryEntity);
  }

  async getCategory(id: number): Promise<Category> {
    const existedCategory = this.categoryRepository.findById(id);

    if (!existedCategory) {
      throw new NotFoundException(CategoryExceptionMessage.NotFound);
    }

    return existedCategory;
  }

  async getCategories(): Promise<Category[]> {
    const existedCategories = await this.categoryRepository.find();

    if (existedCategories.length === 0) {
      throw new NotFoundException(CategoryExceptionMessage.NotFound);
    }

    return existedCategories;
  }
}
