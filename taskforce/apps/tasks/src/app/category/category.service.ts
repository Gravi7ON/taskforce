import { Category } from '@taskforce/shared-types';
import { Injectable } from '@nestjs/common';
import { CategoryRepository } from './category.repository';
import { CreateCategoryDto } from './dto/create-category.dto';
import { CategoryEntity } from './category.entity';

@Injectable()
export class CategoryService {
  constructor(
    private readonly categoryRepository: CategoryRepository
  ) {}

  async createCategory(dto: CreateCategoryDto): Promise<Category> {
    const categoryEntity = new CategoryEntity(dto);

    return this.categoryRepository.create(categoryEntity);
  }

  async getCategory(id: number): Promise<Category> {
    return this.categoryRepository.findById(id);
  }

  async getCategories(): Promise<Category[]> {
    return this.categoryRepository.find();
  }
}
