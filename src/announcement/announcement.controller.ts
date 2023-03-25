import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, Request } from '@nestjs/common';
import { AnnouncementService } from './announcement.service';
import { CreateAnnouncementDto } from './dto/create-announcement.dto';
import { UpdateAnnouncementDto } from './dto/update-announcement.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
@Controller('announcement')
export class AnnouncementController {
  constructor(private readonly announcementService: AnnouncementService) {}
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createAnnouncementDto: CreateAnnouncementDto, @Request() req) {
    const username = req.user.username;
    return this.announcementService.create(createAnnouncementDto, username);
  }

  @Get()
  findAll(@Query() query: { content: string }) {
    return this.announcementService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.announcementService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateAnnouncementDto: UpdateAnnouncementDto) {
    return this.announcementService.update(+id, updateAnnouncementDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.announcementService.remove(+id);
  }
}
