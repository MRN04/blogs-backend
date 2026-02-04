import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  Query,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Request() req, @Body() createPostDto: CreatePostDto) {
    return this.postsService.create(req.user.id, createPostDto);
  }

  @Get()
  findAll(@Query('search') search?: string, @Query('sortBy') sortBy?: string) {
    return this.postsService.findAll(search, sortBy);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Request() req) {
    const userId = req.user?.id;
    return this.postsService.findOne(id, userId);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Request() req,
    @Body() updatePostDto: UpdatePostDto,
  ) {
    return this.postsService.update(id, req.user.id, updatePostDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string, @Request() req) {
    return this.postsService.remove(id, req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id/like')
  toggleLike(@Param('id') id: string, @Request() req) {
    return this.postsService.toggleLike(id, req.user.id);
  }

  @Get(':id/likes')
  getLikes(@Param('id') id: string) {
    return this.postsService.getLikes(id);
  }
}
