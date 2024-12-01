import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';

export class PriceSubUnitDto {
  @IsOptional()
  @IsInt()
  @Transform(({ value }) => {
    return Number(value);
  })
  gte?: number;

  @Transform(({ value }) => {
    return Number(value);
  })
  @IsOptional()
  @IsInt()
  lte?: number;
}

export class QueryProductDto {
  @ApiProperty({ example: 'product - A', required: false })
  @IsOptional()
  name?: string;
  @ApiProperty({ example: 'gte=10', required: false })
  @IsOptional()
  price_subunit?: PriceSubUnitDto;
}
