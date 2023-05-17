import { Get, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { CreateRegisterDto } from './dto/create-register.dto';
import { UpdateRegisterDto } from './dto/update-register.dto';
import { Register } from './entities/register.entity';

@Injectable()
export class RegisterService {
  constructor(@InjectRepository(Register) private readonly registerRepository: Repository<Register>) {
  }

  async create(createRegisterDto: CreateRegisterDto) {
    const existingUser = await this.registerRepository.findOne({
      where: { username: createRegisterDto.username }
    });

    if (existingUser) {
      throw new Error('该用户名已经被注册');
    }
    const { username, password, className, grade } = createRegisterDto;
    const user = new Register();
    user.username = username;
    user.password = password;
    user.className = className;
    user.grade = grade;
    return this.registerRepository.save(user);
  }

  async findAll(query: { username: string }): Promise<any> {
    const registers = await this.registerRepository.find({
      where: {
        username: Like(`%${query.username}%`)
      }
    });
    return registers.map(({ userId, username, password }) => ({ userId, username, password }));
  }

  async findOne(username: string): Promise<any> {
    const register = await this.registerRepository.findOne({
      where: {
        username
      }
    })
    return register;
  }
  async findStudent(query: { username: string }) {
    const username = Object.keys(query).length === 0 ? '' : query.username;
    const student = await this.registerRepository.find({
      where: {
        username: Like(`%${username}%`)
      }
    })
    return student;
  }

  update(id: number, updateRegisterDto: UpdateRegisterDto) {
    return this.registerRepository.update(id, updateRegisterDto);
  }

  remove(id: number) {
    return this.registerRepository.delete(id);
  }
}
