import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
@Entity()
export class Student {
    @PrimaryGeneratedColumn()
    id: number
    @Column()
    student_id: number
    @Column()
    student_name: string
    @Column()
    student_phone: string
    @Column()

    student_class: string
    @Column()
    create_time: string;
}
