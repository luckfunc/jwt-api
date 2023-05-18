export class CreateCommentDto {
  //用户ID
  userId: number
  content: string
  parentCommentId?: number
  username: string
}
