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
import { ProductDTO } from './product.dto';
import { ProductService } from './product.service';

@Controller()
export class ProductController {
  constructor(private ProductService: ProductService) {}

  @Post('/product')
  async create(@Body() data: ProductDTO) {
    return await this.ProductService.create(data);
  }

  @Get('/product')
  async findAll() {
    return await this.ProductService.findAll();
  }

  @Get('/product/:id')
  async findOne(@Param('id') id: string) {
    return await this.ProductService.findOne(id);
  }

  @Get('/product/search/:search')
  async findQuery(@Param('search') search: string) {
    return await this.ProductService.findQuery(search);
  }

  @Patch('/product/edit/:id')
  @ApiBearerAuth('access-token')
  async updateOne(@Param('id') id: string, @Body() data: ProductDTO) {
    return await this.ProductService.updateOne(id, data);
  }

  @Delete('/product/delete/:id')
  @ApiBearerAuth('access-token')
  async delete(@Param('id') id: string) {
    await this.ProductService.delete(id)
      .then(() => {
        HttpStatus.OK;
      })
      .catch(() => {
        HttpStatus.BAD_REQUEST;
      });
  }
}
