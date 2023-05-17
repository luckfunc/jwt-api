import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { RegisterService } from './register.service';
import { CreateRegisterDto } from './dto/create-register.dto';
import { UpdateRegisterDto } from './dto/update-register.dto';

@Controller('register')
export class RegisterController {
  constructor(private readonly registerService: RegisterService) {}

  @Post()
  create(@Body() createRegisterDto: CreateRegisterDto) {
    return this.registerService.create(createRegisterDto);
  }

  @Get()
  findAll(@Query() query: { username: string }) {
    return this.registerService.findAll(query);
  }

  @Get(':username')
  findOne(@Param('username') username: string) {
    return this.registerService.findOne(username);
  }

  @Post('student')
  findStudent(@Query() query: { username: string }) {
    // console.log('body', query);
    return this.registerService.findStudent(query);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRegisterDto: UpdateRegisterDto) {
    return this.registerService.update(+id, updateRegisterDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.registerService.remove(+id);
  }
}
