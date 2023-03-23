import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import OrdersModule from './orders/order.module';
import ProductsModule from './products/product.module';
import { UsersModule } from './users/user.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  app.enableCors({
    origin: ['http://localhost:3000', '*'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Authorization, X-Requested-With',
    exposedHeaders: 'x-auth-token',
    credentials: true,
  });

  const user = new DocumentBuilder()
    .setTitle('Users')
    .setDescription('User API')
    .setVersion('1.0.0')
    .addTag('users')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
      'access-token',
    )
    .build();
  const user_document = SwaggerModule.createDocument(app, user, {
    include: [UsersModule],
  });
  SwaggerModule.setup('api/users', app, user_document);

  const products = new DocumentBuilder()
    .setTitle('Products')
    .setDescription('Patient API')
    .setVersion('1.0.0')
    .addTag('products')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
      'access-token',
    )
    .build();
  const products_document = SwaggerModule.createDocument(app, products, {
    include: [ProductsModule],
  });
  SwaggerModule.setup('api/products', app, products_document);

  const orders = new DocumentBuilder()
    .setTitle('Exams')
    .setDescription('Exam API')
    .setVersion('1.0.0')
    .addTag('exams')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
      'access-token',
    )
    .build();
  const orders_document = SwaggerModule.createDocument(app, orders, {
    include: [OrdersModule],
  });
  SwaggerModule.setup('api/order', app, orders_document);

  const cardium = new DocumentBuilder()
    .setTitle('Cardium')
    .setDescription('Cardium API')
    .setVersion('1.0.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
      'access-token',
    )
    .build();
  const document = SwaggerModule.createDocument(app, cardium);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT || 9000);
}
bootstrap();
