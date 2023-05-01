import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Room } from 'src/room/entities/room.entity';
import { Reservation } from 'src/reservation/entities/reservation.entity';

@Entity()
export class Seat {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  seatNumber: number;

  @Column({ default: 0 })
  status: number;

  @ManyToOne(() => Room, (room) => room.seats)
  room: Room;

  @OneToMany(() => Reservation, (reservation) => reservation.seat)
  reservations: Reservation[];
}