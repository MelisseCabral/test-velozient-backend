import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { OrderDTO } from '../orders/order.dto';
import OrderService from '../orders/order.service';

@Controller()
export default class OrderController {
  constructor(private OrderService: OrderService) {}

  @Post('/order')
  async create(@Body() data: OrderDTO) {
    return await this.OrderService.create(data);
  }

  @Get('/order/:id')
  async findOne(@Param('id') id: string) {
    return await this.OrderService.findOne(id);
  }

  @Get('/orders/user/:id')
  async findQuery(@Param('id') id: string) {
    return await this.OrderService.findByUserId(id);
  }

  @Patch('/order/edit/:id')
  @ApiBearerAuth('access-token')
  async updateOne(@Param('id') id: string, @Body() data: OrderDTO) {
    return await this.OrderService.updateOne(id, data);
  }

  @Delete('/order/delete/:id')
  @ApiBearerAuth('access-token')
  async delete(@Param('id') id: string) {
    await this.OrderService.delete(id)
      .then(() => {
        HttpStatus.OK;
      })
      .catch(() => {
        HttpStatus.BAD_REQUEST;
      });
  }
}
