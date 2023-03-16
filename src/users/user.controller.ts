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
import { UserTypeService } from './user-type.service';
import { UserDTO, UserTypeDTO } from './user.dto';
import { UserService } from './user.service';

@Controller()
export class UserController {
  constructor(
    private userService: UserService,
    private userTypeService: UserTypeService,
  ) {}

  @Post('/user')
  async create(@Body() data: UserDTO) {
    return await this.userService.create(data);
  }

  @Post('/user/type')
  async createType(@Body() data: UserTypeDTO) {
    return await this.userTypeService.create(data);
  }

  @Get('/user/type/')
  async findAllTypes() {
    return await this.userTypeService.findAll();
  }

  @Patch('/user/edit/:id')
  @ApiBearerAuth('access-token')
  async updateOne(@Param('id') id: string, @Body() data: UserDTO) {
    return await this.userService.updateOne(id, data);
  }

  @Delete('/user/delete/:id')
  @ApiBearerAuth('access-token')
  async delete(@Param('id') id: string) {
    await this.userService
      .delete(id)
      .then(() => {
        HttpStatus.OK;
      })
      .catch(() => {
        HttpStatus.BAD_REQUEST;
      });
  }
}
