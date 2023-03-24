import { Injectable } from '@nestjs/common';
import { RegisterService } from '../register/register.service'
export type User = {
  userId: number
  username: string
  password: string
};
@Injectable()
export class UsersService {
  constructor(private readonly register: RegisterService) {}
 

  async findOne(username: string): Promise<User | undefined> {
    const currentUser = await this.register.findAll({ username: username });
    return currentUser.find((user) => user.username === username);
  }
}
