import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from "typeorm";
@Entity()
export class Announcement {
  @PrimaryGeneratedColumn()
  id: number
  @Column({ length: 1000 })
  content: string
  @CreateDateColumn({ type: "timestamp" })
  time: Date;
}
