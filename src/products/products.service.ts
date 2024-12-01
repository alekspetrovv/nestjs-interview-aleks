import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { FindManyOptions, Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { QueryProductDto } from './dto/query-product.dto';
import { Category } from './entities/category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { productQuery } from '../utils/queries/product.query';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  findAll(queryProductDto?: QueryProductDto): Promise<Product[]> {
    const query: FindManyOptions<Product> = productQuery(queryProductDto);
    return this.productsRepository.find(query);
  }

  findAllCategories() {
    return this.categoryRepository.find();
  }

  findOne(id: number) {
    return this.productsRepository.findOneOrFail({
      where: { id },
      relations: ['categories'],
    });
  }

  create(createProductDto: CreateProductDto) {
    return this.productsRepository.save(createProductDto);
  }

  async linkCategoriesToProducts(id: number, categoryId: number) {
    return await this.productsRepository
      .createQueryBuilder('product')
      .relation(Product, 'categories')
      .of(id)
      .add(categoryId);
  }

  createCategory(createCategoryDto: CreateCategoryDto) {
    return this.categoryRepository.save(createCategoryDto);
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const product = await this.findOne(id);
    return this.productsRepository.save({ ...product, ...updateProductDto });
  }

  remove(product: Product) {
    return this.productsRepository.delete(product.id);
  }
}
