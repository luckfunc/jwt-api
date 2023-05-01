import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Comment } from './entities/comment.entity';
import { Like, Repository } from 'typeorm';
import { Register } from 'src/register/entities/register.entity';
@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private commentsRepository: Repository<Comment>,
    @InjectRepository(Register)
    private registerRepository: Repository<Register>,
  ) {}
  async create(createCommentDto: CreateCommentDto) {
    const { content, userId, parentCommentId } = createCommentDto;

    // 查找用户
    const { className, grade, icon } = await this.registerRepository.findOne({
      where: {
        userId: userId
      }
    });

    const comment = new Comment();
    comment.content = content;
    comment.userId = userId;
    comment.className = className;
    comment.grade = grade;
    comment.icon = icon;

    if (parentCommentId) {
      const parentComment = await this.commentsRepository.findOne({
        where: {
          id: parentCommentId
        }
      });
      comment.parentComment = parentComment;
    }

    const savedComment = await this.commentsRepository.save(comment);
    return savedComment;
  }

  async findAll(query: { content: string }) {
    const keyWord = query.content?? ""
    const result = await this.commentsRepository.find({
      where: {
        content: Like(`%${keyWord}%`)
      },
      order: {
        id: "desc"
      },
      relations: ["replies"]
    })
    return result
  }

  findOne(id: number) {
    return `This action returns a #${id} comment`;
  }

  update(id: number, updateCommentDto: UpdateCommentDto) {
    return `This action updates a #${id} comment`;
  }

  remove(id: number) {
    return this.commentsRepository.delete(id);
  }
}