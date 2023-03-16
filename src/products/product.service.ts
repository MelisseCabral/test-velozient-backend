import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/database/PrismaService';
import { ProductDTO } from './product.dto';

@Injectable()
export class ProductService {
  constructor(private prismaClient: PrismaService) {}

  async create(data: ProductDTO) {
    const productData: Prisma.ProductCreateInput = {
      name: data.name,
      description: data.description,
      price: data.price,
      available: data.available,
      imageUrl: data.imageUrl,
      quantity: data.quantity,
    };
    await this.prismaClient.product
      .create({
        data: productData,
      })
      .then(() => {
        return {
          message: 'Product created successfully',
          status: 201,
        };
      })
      .catch((err) => {
        throw new HttpException(
          { message: err.message, code: 500 },
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      });
  }

  async findAll() {
    return await this.prismaClient.product.findMany();
  }

  async findOne(id: string) {
    return await this.prismaClient.product.findUnique({ where: { id: id } });
  }

  async findQuery(search: string) {
    return await this.prismaClient.product.findMany({
      where: {
        OR: [
          { name: { contains: search } },
          { description: { contains: search } },
        ],
      },
    });
  }

  async updateOne(id: string, data: ProductDTO) {
    const updateUser = await this.prismaClient.product.update({
      data: {
        name: data.name,
        description: data.description,
        price: data.price,
        available: data.available,
        quantity: data.quantity,
      },
      where: { id },
    });

    return updateUser;
  }

  async delete(id: string) {
    await this.prismaClient.product.delete({
      where: { id },
    });
  }
}
