import { Injectable } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from "./entities/student.entity";
import { Repository, Like } from 'typeorm';
@Injectable()
export class StudentService {
  constructor(@InjectRepository(Student) private readonly student: Repository<Student>) { }

  create(createStudentDto: CreateStudentDto) {
    const data = new Student();
    let today: any = new Date();

//日期
    const DD = String(today.getDate()).padStart(2, '0'); // 获取日
    const MM = String(today.getMonth() + 1).padStart(2, '0'); //获取月份，1 月为 0
    const yyyy = today.getFullYear(); // 获取年

// 时间
    const hh =  String(today.getHours()).padStart(2, '0');       //获取当前小时数(0-23)
    const  mm = String(today.getMinutes()).padStart(2, '0');     //获取当前分钟数(0-59)
    const  ss = String(today.getSeconds()).padStart(2, '0');     //获取当前秒数(0-59)
    today = yyyy + '-' + MM + '-' + DD + ' ' + hh + ':' + mm + ':' + ss;
    data.student_name = createStudentDto.student_name;
    data.student_class = createStudentDto.student_class;
    data.student_phone = createStudentDto.student_phone;
    data.create_time = today;
    return this.student.save(data);
  }

  findStudent(name: string) {
    return this.student.find({
      where: {
        student_name: Like(`%${name}%`)
      }
    })
  }

  findOne(id: number) {
    return `This action returns a #${id} student`;
  }

  update(id: number, updateStudentDto: UpdateStudentDto) {
    return this.student.update(id, updateStudentDto);
  }

  remove(id: number) {
    return this.student.delete(id);
  }
}
