import { Prisma } from '.prisma/client';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';
import { UserTypeDTO } from './user.dto';

@Injectable()
export class UserTypeService {
  constructor(private prismaClient: PrismaService) {}

  async create(data: UserTypeDTO) {
    const userTypeData: Prisma.UserTypeCreateInput = {
      name: data.name,
    };

    await this.prismaClient.userType
      .create({
        data: userTypeData,
      })
      .then(() => {
        return {
          message: 'UserType created successfully',
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
    return await this.prismaClient.userType.findMany();
  }
  async delete(id: string) {
    await this.prismaClient.userType.delete({
      where: { id },
    });
  }
}
