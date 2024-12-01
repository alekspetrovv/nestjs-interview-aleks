import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import {ApiBearerAuth, ApiQuery, ApiTags} from '@nestjs/swagger';
import { UpdateProductDto } from './dto/update-product.dto';
import { QueryProductDto } from './dto/query-product.dto';
import { CreateCategoryDto } from './dto/create-category.dto';

@ApiTags('Products')
@ApiBearerAuth()
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}


  @ApiQuery({ name: 'price_subunit[lte]', required: false, type: Number })
  @ApiQuery({ name: 'price_subunit[gte]', required: false, type: Number })
  @Get()
  index(@Query() queryProductDto: QueryProductDto) {
    return this.productsService.findAll(queryProductDto);
  }

  @Get('/categories')
  categoriesIndex() {
    return this.productsService.findAllCategories();
  }

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Post('/categories')
  createCategory(@Body() createCategoryDto: CreateCategoryDto) {
    return this.productsService.createCategory(createCategoryDto);
  }

  @Get(':id')
  show(@Param('id') id: number) {
    return this.productsService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productsService.update(id, updateProductDto);
  }

  @Patch(':id/categories/:categoryId')
  async linkCategoriesToProducts(
    @Param('id') id: number,
    @Param('categoryId') categoryId: number,
  ) {
    return this.productsService.linkCategoriesToProducts(id, categoryId);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    const product = await this.productsService.findOne(id);

    return this.productsService.remove(product);
  }
}
