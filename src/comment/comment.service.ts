import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Comment } from './entities/comment.entity';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma-service/prisma.service';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class CommentService {
  constructor(private prismaService: PrismaService) {}
  async create(
    @CurrentUser() user: User | any,
    createCommentDto: CreateCommentDto,
    cardId: number,
  ): Promise<Comment> {
    try {
      const data: Prisma.commentCreateInput = {
        ...createCommentDto,
        userId: user.id,
        card: { connect: { id: cardId } },
      };
      const createdComment = this.prismaService.comment.create({ data });

      console.log('sucesso');

      return createdComment;
    } catch (error) {
      console.log('Erro ao criar area de trabalho: ', error);
    }
  }

  findAll() {
    return `This action returns all comment`;
  }

  findOne(id: number) {
    return `This action returns a #${id} comment`;
  }

  update(id: number, updateCommentDto: UpdateCommentDto) {
    return `This action updates a #${id} comment`;
  }

  remove(id: number) {
    return `This action removes a #${id} comment`;
  }
}
