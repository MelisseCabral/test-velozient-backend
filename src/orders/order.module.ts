import { Module } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';
import OrderController from './order.controller';
import OrderService from './order.service';

@Module({
  controllers: [OrderController],
  providers: [OrderService, PrismaService],
})
export default class OrdersModule {}
