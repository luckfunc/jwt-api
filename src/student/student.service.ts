import { Injectable } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from "./entities/student.entity";
import { Repository, Like } from 'typeorm';
@Injectable()
export class StudentService {
  constructor(@InjectRepository(Student) private readonly student: Repository<Student>) { }

  async create(createStudentDto: CreateStudentDto) {
    const studentVal = await this.findStudentName(createStudentDto.student_name);
    if (studentVal.some(item => item.student_name === createStudentDto.student_name)) {
      return '用户已经存在';
    }
    const dayJs = require('dayjs');
    const data = new Student();
    data.student_name = createStudentDto.student_name;
    data.student_class = createStudentDto.student_class;
    data.student_phone = createStudentDto.student_phone;
    data.student_id = createStudentDto.student_id;
    data.create_time = dayJs().format("YYYY-MM-DD HH:mm:ss")
    return this.student.save(data);
  }

  findStudentName(name: string) {
    return this.student.find({
      where: {
        student_name: Like(`%${name}%`),
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
