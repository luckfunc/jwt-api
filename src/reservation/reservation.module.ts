import { Module } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { ReservationController } from './reservation.controller';
import { Reservation } from "./entities/reservation.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Register } from "../register/entities/register.entity";
import { RegisterService } from "../register/register.service";
import { Seat } from "../seat/entities/seat.entity";
import { SeatService } from "../seat/seat.service";
import { Room } from "../room/entities/room.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Reservation, Register, Seat, Room])],
  controllers: [ReservationController],
  providers: [ReservationService, RegisterService, SeatService]
})
export class ReservationModule {}
