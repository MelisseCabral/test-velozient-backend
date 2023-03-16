import { ApiProperty } from '@nestjs/swagger';
import { ProductDTO } from 'src/products/product.dto';

export interface OrderItemDTO {
  id: string;
  product: ProductDTO;
  productId: string;
  quantity: number;
  order: OrderDTO | null;
  orderId: string | null;
}

export class OrderDTO {
  id: string;
  @ApiProperty()
  clientId: string;
  @ApiProperty()
  employerId: string;
  @ApiProperty()
  price: number;
  @ApiProperty()
  status: string;
  @ApiProperty()
  orderItems: OrderItemDTO[];
}
