import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Register } from 'src/register/entities/register.entity';
import { Seat } from 'src/seat/entities/seat.entity';
@Entity()
export class Reservation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: null })
  start_time: number | null
  @Column({ default: null })
  end_time: number | null

  @ManyToOne(() => Register, (register) => register.reservations)
  register: Register;

  @ManyToOne(() => Seat, (seat) => seat.reservations)
  seat: Seat;
}
