import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from './entities/comment.entity';
import { Register } from 'src/register/entities/register.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Comment, Register])],
  controllers: [CommentController],
  providers: [CommentService]
})
export class CommentModule {}


