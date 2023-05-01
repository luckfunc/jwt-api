import { Injectable } from '@nestjs/common';
import { CreateSeatDto } from './dto/create-seat.dto';
import { UpdateSeatDto } from './dto/update-seat.dto';
import { Seat } from './entities/seat.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
@Injectable()
export class SeatService {
  constructor(
    @InjectRepository(Seat)
    private seatRepository: Repository<Seat>,
  ) {}
  create(createSeatDto: CreateSeatDto) {
    const seat = new Seat();
    seat.id = createSeatDto.id;
    return 'This action adds a new seat';
  }

  async findAll() {
    const seats = await this.seatRepository.find({ relations: ['reservations'] });
    return seats.map(seat => {
      const reserved = seat.reservations.some(reservation => {
        // return reservation.reservation_time > Date.now();
      });
      return {
        ...seat,
        reserved
      };
    });
  }

  async findOne(id: number) {
    const seat = await this.seatRepository.findOne({
      where: {
        id
      }
    })
    return seat;
  }

  update(id: number, updateSeatDto: UpdateSeatDto) {
    return this.seatRepository.update(id, updateSeatDto);
  }

  remove(id: number) {
    return `This action removes a #${id} seat`;
  }
}
