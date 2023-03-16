import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/database/PrismaService';
import { OrderDTO } from './Order.dto';

@Injectable()
export default class OrderService {
  constructor(private prismaClient: PrismaService) {}

  async create(data: OrderDTO) {
    const OrderData: Prisma.OrderCreateInput = {
      price: data.price,
      status: data.status,
      orderItems: {
        create: data.orderItems,
      },
      client_id: '',
      employer_id: '',
    };
    await this.prismaClient.order
      .create({
        data: OrderData,
      })
      .then(() => {
        return {
          message: 'Order created successfully',
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

  async findOne(id: string) {
    return await this.prismaClient.order.findUnique({ where: { id: id } });
  }

  async findByUserId(id: string) {
    return await this.prismaClient.order.findMany({
      where: {
        OR: [{ client_id: { equals: id } }, { employer_id: { equals: id } }],
      },
    });
  }

  async updateOne(id: string, data: OrderDTO) {
    const updateUser = await this.prismaClient.order.update({
      data: {
        price: data.price,
        status: data.status,
        orderItems: {
          create: data.orderItems,
        },
        client_id: '',
        employer_id: '',
      },
      where: { id },
    });

    return updateUser;
  }

  async delete(id: string) {
    await this.prismaClient.order.delete({
      where: { id },
    });
  }
}
