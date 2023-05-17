import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Seat } from 'src/seat/entities/seat.entity';
@Entity()
export class Room {
  @PrimaryGeneratedColumn()
  id: number
  @Column()
  roomNumber: number;

  @Column()
  name: string;

  @Column()
  description: string;
  @OneToMany(() => Seat, (seat) => seat.room)
  seats: Seat[];
}