import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Register {
  @PrimaryGeneratedColumn()
  userId: number

  @Column()
  username: string

  @Column()
  password: string

  @Column({ nullable: true })
  className: string

  @Column({ nullable: true })
  grade: string

  @Column({ nullable: true, default: "https://tucdn.wpon.cn/2023/02/25/8af8ac480bcd7.jpg" })
  icon?: string
}
