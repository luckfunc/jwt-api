import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { InjectRepository } from "@nestjs/typeorm";
import { Reservation } from "./entities/reservation.entity";
import { Repository } from "typeorm";
import { RegisterService } from "../register/register.service";
import { SeatService } from "../seat/seat.service";
import { Room } from "../room/entities/room.entity";
import * as dayjs from 'dayjs';
@Injectable()
export class ReservationService {
    constructor(
        @InjectRepository(Reservation) private reservationRepository: Repository<Reservation>,
        @InjectRepository(Room) private roomRepository: Repository<Room>,
        private readonly registerService: RegisterService,
        @Inject(forwardRef(() => SeatService))
        private readonly seatService: SeatService
    ) {
    }

    async create(createReservationDto: CreateReservationDto) {
        const reservation = new Reservation();
        const { start_time, seat_id, username, end_time } = createReservationDto;
        reservation.start_time = start_time;
        reservation.end_time = end_time;
        reservation.register = await this.registerService.findOne(username);
        const seatInfo = await this.seatService.findOne(seat_id);
        reservation.seat = seatInfo;
        await this.reservationRepository.save(reservation);
        const params = {
            ...seatInfo,
            status: 1,
            username: username
        }
        // console.log(params, 'params');
        // console.log(reservation.register, 'register');
        return this.seatService.update(seat_id, params);
    }

    async findAll({ start_time, end_time }) {
        console.log(start_time, end_time)

        const startTime = start_time ?? dayjs().startOf('day').unix();
        const endTime = end_time ?? dayjs().endOf('day').unix();

        // 查询预约时间范围内的已经预约的座位
        const reservedSeats = await this.reservationRepository
            .createQueryBuilder('reservation')
            .leftJoinAndSelect('reservation.seat', 'seat')
            .leftJoinAndSelect('seat.room', 'room')
            .where('reservation.start_time <= :endTime', { endTime })
            .andWhere('reservation.end_time >= :startTime', { startTime })
            .getMany();

        // 查询所有的房间和座位
        const allRooms = await this.roomRepository.find({
            relations: ['seats'],
        });

        // 根据已经预约的座位来设置 isReserved 字段
        const roomsWithReservations = allRooms.map(room => {
            const availableSeats = room.seats.map(seat => {
                const isReserved = reservedSeats.some(reservation => reservation.seat.id === seat.id);
                const reservation = reservedSeats.find(reservation => reservation.seat.id === seat.id);
                //添加预约Id
                return { ...seat, status: isReserved ? 1 : 0, reservationId: reservation ? reservation.id : null };
            });
            return { ...room, seats: availableSeats };
        });
        return roomsWithReservations;
    }

    findOne(id: number) {

        return this.reservationRepository.find({
            where: {
                id
            }
        });
    }

    update(id: number, updateReservationDto: UpdateReservationDto) {
        return `This action updates a #${id} reservation`;
    }

    async remove(id: number) {
        // console.log(id);
        const seatInfo = await this.reservationRepository.find({
            where: {
              id
            },
            relations: ['seat']
        });
        const params = {
            ...seatInfo[0].seat,
            status: 0
        }
        await this.seatService.update(params.id, params);
        return await this.reservationRepository.delete(id);
    }
}
