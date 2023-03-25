import { Module } from '@nestjs/common';
import { ReplyService } from './reply.service';
import { ReplyController } from './reply.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reply } from './entities/reply.entity';
import { Comment } from 'src/comment/entities/comment.entity';
import { Register } from "../register/entities/register.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Reply, Comment, Register])],
  controllers: [ReplyController],
  providers: [ReplyService]
})
export class ReplyModule {}
