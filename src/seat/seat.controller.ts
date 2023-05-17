import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SeatService } from './seat.service';
import { CreateSeatDto } from './dto/create-seat.dto';
import { UpdateSeatDto } from './dto/update-seat.dto';
@Controller('seat')
export class SeatController {
  constructor(private readonly seatService: SeatService) {}

  @Post()
  create(@Body() createSeatDto: CreateSeatDto) {
    return this.seatService.create(createSeatDto);
  }

  @Get()
  findAll() {
    return this.seatService.findAll();
  }
  
  @Get('/room/:roomId') 
  //通过roomId查找座位
  findAllByRoomId(@Param('roomId') roomId) {
    return this.seatService.findAllByRoomId(roomId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.seatService.findOne(+id);
  }

  @Get('/number/:num')
  findOneSeat(@Param('num') num) {
    return this.seatService.findOneSeat(+num);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSeatDto: UpdateSeatDto) {
    return this.seatService.update(+id, updateSeatDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.seatService.remove(+id);
  }
}
