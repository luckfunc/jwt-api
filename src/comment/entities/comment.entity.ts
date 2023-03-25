import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Register } from 'src/register/entities/register.entity';
import { Reply } from "../../reply/entities/reply.entity";

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 1000 })
  content: string;

  @Column()
  userId: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @ManyToOne(() => Register)
  @JoinColumn({ name: 'userId' })
  register: Register;

  @Column({ nullable: true })
  className: string

  @Column({ nullable: true })
  grade: string

  @ManyToOne(() => Comment, { nullable: true })
  @JoinColumn({ name: 'parentCommentId' })
  parentComment?: Comment;

  @Column({ nullable: true })
  parentCommentId?: number;

  @OneToMany(() => Reply, (reply) => reply.parentComment)
  replies?: Comment[];

  @Column()
  icon: string
}
