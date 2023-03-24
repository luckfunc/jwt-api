import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { CreateRegisterDto } from './dto/create-register.dto';
import { UpdateRegisterDto } from './dto/update-register.dto';
import { Register } from './entities/register.entity';

@Injectable()
export class RegisterService {
  constructor(@InjectRepository(Register) private readonly register: Repository<Register>) {}
 async create(createRegisterDto: CreateRegisterDto) {
  const existingUser = await this.register.findOne({
    where: { username: createRegisterDto.username }
  });

  if (existingUser) {
    throw new Error('该用户名已经被注册');
  }

  const user = new Register();
  user.username = createRegisterDto.username;
  user.password = createRegisterDto.password;

  return this.register.save(user);
}

  async findAll(query: { username: string }): Promise<any> {
    const registers = await this.register.find({
      where: {
        username: Like(`%${query.username}%`)
      }
    });
    return registers.map(({userId, username, password}) => ({userId, username, password}));
  }
  

  findOne(id: number) {
    return `This action returns a #${id} register`;
  }

  update(id: number, updateRegisterDto: UpdateRegisterDto) {
    return `This action updates a #${id} register`;
  }

  remove(id: number) {
    return `This action removes a #${id} register`;
  }
}
