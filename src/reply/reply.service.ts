import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {  Like, Repository } from 'typeorm';
import { CreateReplyDto } from './dto/create-reply.dto';
import { UpdateReplyDto } from './dto/update-reply.dto';
import { Reply } from './entities/reply.entity';
import { Comment } from 'src/comment/entities/comment.entity';
import { Register } from "../register/entities/register.entity";

@Injectable()
export class ReplyService {
  constructor(
    @InjectRepository(Reply)
    private replyRepository: Repository<Reply>,
    @InjectRepository(Comment)
    private commentRepository: Repository<Comment>,
    @InjectRepository(Register)
    private registerRepository: Repository<Register>,
  ) {}
  async create(createReplyDto: CreateReplyDto) {
    const { content, userId, parentCommentId } = createReplyDto;
    // 查找用户
    const { className, grade, icon } = await this.registerRepository.findOne({
      where: {
        userId: userId
      }
    });
    const parentComment = await this.commentRepository.findOne({
      where: {
        id: parentCommentId
      }
    });
    if (!parentComment) {
      // 如果父评论不存在，返回 null。
      return null;
    }

    const reply = new Reply();
    reply.content = content;
    reply.userId = userId;
    reply.parentComment = parentComment;
    reply.className = className;
    reply.grade = grade;
    reply.icon = icon;

    const savedReply = await this.replyRepository.save(reply);
    return savedReply;
  }

  async findAll(query: { parentCommentId?: number }) {
    const where = {};
    if (query.parentCommentId) {
      where['parentCommentId'] = query.parentCommentId;
    }
    return this.replyRepository.find({ where });
  }

  findOne(id: number) {
    return `This action returns a #${id} reply`;
  }

  update(id: number, updateReplyDto: UpdateReplyDto) {
    return `This action updates a #${id} reply`;
  }

  remove(id: number) {
    // console.log(id, "id");
    return this.replyRepository.delete(id);
  }
}