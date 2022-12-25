import { Body, Post, Controller, Param, Get } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { fillObject } from '@taskforce/core';
import { CategoryRdo } from './rdo/category.rdo';

@Controller('category')
export class CategoryController {
  constructor(
    private readonly categoryService: CategoryService
  ) {}

  @Get('/:id')
  async show(@Param('id') id: string) {
    const categoryId = parseInt(id, 10);
    const existCategory = await this.categoryService.getCategory(categoryId);
    return fillObject(CategoryRdo, existCategory);
  }

  @Get('/')
  async index() {
    const categories = await this.categoryService.getCategories();
    return fillObject(CategoryRdo, categories);
  }

  @Post('/')
  async create(@Body() dto: CreateCategoryDto) {
    const newCategory = await this.categoryService.createCategory(dto);

    return fillObject(CategoryRdo, newCategory);
  }
}
