import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';

import AuthVerification from './auth/auth.middleware';
import OrderController from './orders/order.controller';
import OrdersModule from './orders/order.module';
import ProductsModule from './products/product.module';
import { UsersModule } from './users/user.module';

@Module({
  imports: [
    UsersModule,
    OrdersModule,
    ProductsModule,
    MulterModule.register({
      dest: './',
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthVerification).forRoutes(OrderController);
    consumer
      .apply(AuthVerification)
      .forRoutes(
        { path: '/order', method: RequestMethod.POST },
        { path: '/product', method: RequestMethod.POST },
      );
    consumer.apply().forRoutes(ProductsModule, UsersModule);
  }
}
