import { ApiProperty } from '@nestjs/swagger';
import { OrderItemDTO } from '../orders/order.dto';

export class ProductDTO {
  @ApiProperty()
  name: string;
  @ApiProperty()
  description: string;
  @ApiProperty()
  price: number;
  @ApiProperty()
  available: boolean;
  @ApiProperty()
  imageUrl: string;
  @ApiProperty()
  quantity: number;
  @ApiProperty()
  categories: CategoryDTO[];
  @ApiProperty()
  orderItems: OrderItemDTO[];
}

export interface CategoryDTO {
  id: string;
  name: string;
  products: ProductDTO[];
}
