import {
  Between,
  FindManyOptions,
  LessThanOrEqual,
  MoreThanOrEqual,
} from 'typeorm';
import { QueryProductDto } from '../../products/dto/query-product.dto';
import { Product } from '../../products/entities/product.entity';

export const productQuery = (
  queryProductDto: QueryProductDto,
): FindManyOptions<Product> => {
  const query: FindManyOptions<Product> = {
    where: {},
  };

  const { name, price_subunit } = queryProductDto;

  // filter by name
  if (name) {
    Object.assign(query.where, { name });
  }

  // filter by price
  if (price_subunit) {
    // price between
    if (price_subunit.lte && price_subunit.gte) {
      Object.assign(query.where, {
        priceSubunit: Between(price_subunit.gte, price_subunit.lte),
      });

      // price more than or equal
    } else if (price_subunit.gte) {
      Object.assign(query.where, {
        priceSubunit: MoreThanOrEqual(price_subunit.gte),
      });

      // price less than or equal
    } else if (price_subunit.lte) {
      Object.assign(query.where, {
        priceSubunit: LessThanOrEqual(price_subunit.lte),
      });
    }
  }

  return query;
};
