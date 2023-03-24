import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Register {
  @PrimaryGeneratedColumn()
  userId: number
  @Column()
  username: string
  @Column()
  password: string
}
