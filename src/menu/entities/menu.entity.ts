import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
@Entity()
export class Menu {
  @PrimaryGeneratedColumn()
  id: number
  @Column()
  name: string
  @Column()
  icon: string
  @Column()
  route: string
  @Column({ nullable: true })
  sort: number
}
