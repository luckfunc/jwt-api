import { Module } from '@nestjs/common';
import { SeatService } from './seat.service';
import { SeatController } from './seat.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Seat } from './entities/seat.entity';
import { Reservation } from 'src/reservation/entities/reservation.entity';
import { Room } from 'src/room/entities/room.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Seat, Reservation, Room])],
  controllers: [SeatController],
  providers: [SeatService]
})
export class SeatModule {}
