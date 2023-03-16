import { Module } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';
import { UserTypeService } from './user-type.service';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  controllers: [UserController],
  providers: [UserService, PrismaService, UserTypeService],
})
export class UsersModule {}
