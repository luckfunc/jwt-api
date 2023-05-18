import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { CreateSeatDto } from './dto/create-seat.dto';
import { UpdateSeatDto } from './dto/update-seat.dto';
import { Seat } from './entities/seat.entity';
import { Reservation } from 'src/reservation/entities/reservation.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ReservationService } from 'src/reservation/reservation.service';
import { ModuleRef } from '@nestjs/core';
@Injectable()
export class SeatService {
  constructor(
    @InjectRepository(Seat)
    private seatRepository: Repository<Seat>,
    @InjectRepository(Reservation)
    private reservationRepository: Repository<Reservation>,
    @Inject(forwardRef(() => ReservationService))
    private readonly reservationService: ReservationService
  ) {}
  create(createSeatDto: CreateSeatDto) {
    const seat = new Seat();
    seat.roomId = createSeatDto.roomId;
    seat.status = 0;
    seat.seatNumber = createSeatDto.seatNumber;
    seat.userId = 0;
    seat.username = '';

    return this.seatRepository.save(seat);
  }

  async findAll() {
    const seat = await this.seatRepository.find();
    // const seats = await this.seatRepository.find({ relations: ['reservations'] });
    // return seats.map(seat => {
    //   const reserved = seat.reservations.some(reservation => {
    //     // return reservation.reservation_time > Date.now();
    //   });
    //   return {
    //     ...seat,
    //     reserved
    //   };
    // });
    return seat;
  }

  async findOne(id: number) {
    const seat = await this.seatRepository.findOne({
      where: {
        id
      }
    })
    return seat;
  }

  async findOneSeat(num: number) {
    console.log(num, typeof num);
    //TODO 这块传空串会报错
    const seat = await this.seatRepository.find({
      where: {
        seatNumber: num
      }
    });
    return seat;
  }

  async findAllByRoomId(roomId: number) {
    const seat = await this.seatRepository.find({
      where: {
        roomId: roomId
      }
    })
    return seat;
  }

  update(id: number, updateSeatDto: UpdateSeatDto) {
    return this.seatRepository.update(id, updateSeatDto);
  }

  async remove(id: number) {
    //通过座位id找到预约信息
    const reservation = await this.reservationRepository.find({
      where: {
        seatId: id
      }
    })
    const reservationId = reservation[0].id;
    return  this.reservationService.remove(reservationId);
  }
}
