import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Injectable()
export class CommentsService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, createCommentDto: CreateCommentDto) {
    const post = await this.prisma.post.findUnique({
      where: { id: createCommentDto.postId },
    });

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    const comment = await this.prisma.comment.create({
      data: {
        content: createCommentDto.content,
        authorId: userId,
        postId: createCommentDto.postId,
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    return comment;
  }

  async findByPost(postId: string) {
    const comments = await this.prisma.comment.findMany({
      where: { postId },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return comments;
  }

  async update(id: string, userId: string, updateCommentDto: UpdateCommentDto) {
    const comment = await this.prisma.comment.findUnique({
      where: { id },
    });

    if (!comment) {
      throw new NotFoundException('Comment not found');
    }

    if (comment.authorId !== userId) {
      throw new ForbiddenException('You can only update your own comments');
    }

    const updatedComment = await this.prisma.comment.update({
      where: { id },
      data: updateCommentDto,
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    return updatedComment;
  }

  async remove(id: string, userId: string) {
    const comment = await this.prisma.comment.findUnique({
      where: { id },
    });

    if (!comment) {
      throw new NotFoundException('Comment not found');
    }

    if (comment.authorId !== userId) {
      throw new ForbiddenException('You can only delete your own comments');
    }

    await this.prisma.comment.delete({
      where: { id },
    });

    return { message: 'Comment deleted successfully' };
  }
}
