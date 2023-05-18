import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { Repository } from 'typeorm';
import { Room } from './entities/room.entity';

@Injectable()
export class RoomService {
  constructor(
    @InjectRepository(Room)
    private readonly roomRepository: Repository<Room>,
  ) { }
  create(createRoomDto: CreateRoomDto) {
    const room = new Room();
    room.description = createRoomDto.description;
    room.roomNumber = createRoomDto.roomNumber;
    room.name = createRoomDto.name;
    
    return this.roomRepository.save(room);
  }

  async findAll() {
    // const rooms = await this.roomRepository.find(
    //   {
    //     relations: ['seats']
    //   }
    // );
    // return rooms;
    const rooms = await this.roomRepository.find({
      order: {
        id: 'DESC'
      }
    });
    return rooms;
  }

  findOne(description: string) {
    console.log(description);
    const room = this.roomRepository.find({
      where: {
        description
      },
      
    })
    return room;
  }

  update(id: number, updateRoomDto: UpdateRoomDto) {
    return `This action updates a #${id} room`;
  }

  remove(id: number) {
    return `This action removes a #${id} room`;
  }
}
