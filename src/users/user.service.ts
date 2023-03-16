import { Prisma } from '.prisma/client';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/database/PrismaService';
import { UserDTO } from './user.dto';

@Injectable()
export class UserService {
  constructor(private prismaClient: PrismaService) {}

  async create(data: UserDTO) {
    const { password } = data;
    const hash = bcrypt.hashSync(password, 10);
    const userData: Prisma.UserCreateInput = {
      name: data.name,
      email: data.email,
      password: hash,
      type: {
        connect: { id: data.typeId },
      },
    };

    await this.prismaClient.user
      .create({
        data: userData,
      })
      .then(() => {
        return {
          message: 'User created successfully',
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
    return await this.prismaClient.user.findUnique({ where: { id: id } });
  }

  async updateOne(id: string, data: UserDTO) {
    const updateUser = await this.prismaClient.user.update({
      data: {
        name: data.name,
        email: data.email,
        password: data.password,
        type: {
          connect: { id: data.typeId },
        },
      },
      where: { id },
    });

    return updateUser;
  }

  async delete(id: string) {
    await this.prismaClient.user.delete({
      where: { id },
    });
  }
}
