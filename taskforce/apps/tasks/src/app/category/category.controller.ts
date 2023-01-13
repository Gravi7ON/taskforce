import { Body, Post, Controller, Param, Get, ParseIntPipe, UseGuards } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { fillObject } from '@taskforce/core';
import { CategoryRdo } from './rdo/category.rdo';
import { JwtAuthGuard } from '../task/guards/jwt-auth.guard';
import { RolesGuard } from '../task/guards/user-role.guard';

@Controller('category')
export class CategoryController {
  constructor(
    private readonly categoryService: CategoryService
  ) {}

  @Get('/')
  async index() {
    const categories = await this.categoryService.getCategories();
    return fillObject(CategoryRdo, categories);
  }

  @Get('/:id')
  async show(@Param('id', ParseIntPipe) id: number) {
    const category = await this.categoryService.getCategory(id);
    return fillObject(CategoryRdo, category);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('/')
  async create(@Body() dto: CreateCategoryDto) {
    const newCategory = await this.categoryService.createCategory(dto);

    return fillObject(CategoryRdo, newCategory);
  }
}
