import { ApiProperty } from '@nestjs/swagger';

export class UserDTO {
  @ApiProperty()
  name: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  password: string;
  @ApiProperty()
  typeId: string;
}

export class UserTypeDTO {
  id: string;
  @ApiProperty()
  name: string;
  users: UserDTO[];
}
