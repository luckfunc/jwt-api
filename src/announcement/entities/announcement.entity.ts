import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
@Entity()
export class Announcement {
  @PrimaryGeneratedColumn()
  id: number
  @Column()
  content: string
  @Column()
  create_time: string;
}
