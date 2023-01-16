import { Body, Post, Controller, Param, Get, ParseIntPipe, UseGuards, HttpStatus } from '@nestjs/common';
import { ApiBearerAuth, ApiConflictResponse, ApiNotFoundResponse, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { createFailedSchemaResponse, fillObject } from '@taskforce/core';
import { CategoryRdo } from './rdo/category.rdo';
import { JwtAuthGuard } from '../task/guards/jwt-auth.guard';
import { RolesGuard } from '../task/guards/user-role.guard';
import { CategoryExceptionMessage } from './category.constant';

@ApiTags('Category')
@Controller('category')
export class CategoryController {
  constructor(
    private readonly categoryService: CategoryService
  ) {}

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'List categories',
    type: [CategoryRdo]
  })
  @ApiNotFoundResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Categories not found',
    schema: createFailedSchemaResponse(HttpStatus.NOT_FOUND, CategoryExceptionMessage.NotFound)
  })
  @Get('/')
  async index() {
    const categories = await this.categoryService.getCategories();
    return fillObject(CategoryRdo, categories);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Category',
    type: CategoryRdo
  })
  @ApiNotFoundResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Category not found',
    schema: createFailedSchemaResponse(HttpStatus.NOT_FOUND, CategoryExceptionMessage.NotFound)
  })
  @ApiParam({
    name: 'id',
    description: 'Unique category id',
    example: 6
  })
  @Get('/:id')
  async show(@Param('id', ParseIntPipe) id: number) {
    const category = await this.categoryService.getCategory(id);
    return fillObject(CategoryRdo, category);
  }

  @ApiBearerAuth()
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'New category has been successfuly created',
    type: CategoryRdo
  })
  @ApiConflictResponse({
    status: HttpStatus.CONFLICT,
    description: 'Category already exists',
    schema: createFailedSchemaResponse(HttpStatus.CONFLICT, CategoryExceptionMessage.ExistsCategory)
  })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('/')
  async create(@Body() dto: CreateCategoryDto) {
    const newCategory = await this.categoryService.createCategory(dto);

    return fillObject(CategoryRdo, newCategory);
  }
}
