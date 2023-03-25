import { Injectable } from '@nestjs/common';
import { CreateAnnouncementDto } from './dto/create-announcement.dto';
import { UpdateAnnouncementDto } from './dto/update-announcement.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Announcement } from './entities/announcement.entity';
import { Like, Repository } from 'typeorm';
@Injectable()
export class AnnouncementService {
  constructor(@InjectRepository(Announcement)private readonly announcement:  Repository<Announcement>) {}
  create(createAnnouncementDto: CreateAnnouncementDto, username: any) {
    const data = new Announcement();
    data.content = createAnnouncementDto.content;
    data.user = username;
    return this.announcement.save(data);
  }

  findAll(query: { content: string }) {
    const keyWord = query.content?? ""
    return this.announcement.find({
      where: {
        content: Like(`%${keyWord}%`)
      },
      order: {
        id: "desc"
      }
    })
  }

  findOne(id: number) {
    return `This action returns a #${id} announcement`;
  }

  update(id: number, updateAnnouncementDto: UpdateAnnouncementDto) {
    return this.announcement.update(id, updateAnnouncementDto)
  }

  remove(id: number) {
    return this.announcement.delete(id);
  }
}
