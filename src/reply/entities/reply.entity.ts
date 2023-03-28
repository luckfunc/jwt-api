import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Comment } from 'src/comment/entities/comment.entity';

@Entity()
export class Reply {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @Column()
  userId: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @ManyToOne(() => Comment, comment => comment.replies)
  @JoinColumn({ name: 'commentId' })
  comment: Comment;

  @Column({ nullable: true })
  className: string

  @Column({ nullable: true })
  grade: string

  @ManyToOne(() => Reply, { nullable: true })
  @JoinColumn({ name: 'parentReplyId' })
  parentReply?: Reply;

  @Column({ nullable: true })
  parentReplyId?: number;

  @ManyToOne(() => Comment, { nullable: true })
  @JoinColumn({ name: 'parentCommentId' })
  parentComment?: Comment;

  @Column({ nullable: true })
  parentCommentId?: any;
  @Column()
  icon: string
}
