import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { Repository, Like } from 'typeorm';
import { Menu } from './entities/menu.entity';
@Injectable()
export class MenuService {
  constructor(@InjectRepository(Menu) private readonly menu: Repository<Menu>) { }
  create(createMenuDto: CreateMenuDto) {
    const data = new Menu();
    data.name = createMenuDto.name;
    data.icon = createMenuDto.icon;
    data.route = createMenuDto.route;
    data.sort = createMenuDto.sort;
    return this.menu.save(data);
  }

  findAll() {
    return this.menu.find({
      where: {
        name: Like(`%%`)
      }
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} menu`;
  }

  update(id: number, updateMenuDto: UpdateMenuDto) {
    return `This action updates a #${id} menu`;
  }

  remove(id: number) {
    return `This action removes a #${id} menu`;
  }
}
