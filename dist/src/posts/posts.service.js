"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let PostsService = class PostsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(userId, createPostDto) {
        const post = await this.prisma.post.create({
            data: {
                title: createPostDto.title,
                content: createPostDto.content,
                tags: createPostDto.tags || [],
                authorId: userId,
            },
            include: {
                author: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                },
                _count: {
                    select: {
                        likes: true,
                        comments: true,
                    },
                },
            },
        });
        return post;
    }
    async findAll(search, sortBy) {
        const posts = await this.prisma.post.findMany({
            where: search
                ? {
                    OR: [
                        { title: { contains: search, mode: 'insensitive' } },
                        { content: { contains: search, mode: 'insensitive' } },
                        { tags: { has: search } },
                        { author: { name: { contains: search, mode: 'insensitive' } } },
                    ],
                }
                : undefined,
            include: {
                author: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                },
                _count: {
                    select: {
                        likes: true,
                        comments: true,
                    },
                },
            },
            orderBy: sortBy === 'oldest'
                ? { createdAt: 'asc' }
                : sortBy === 'popular'
                    ? { likes: { _count: 'desc' } }
                    : { createdAt: 'desc' },
        });
        return posts;
    }
    async findOne(id, userId) {
        const post = await this.prisma.post.findUnique({
            where: { id },
            include: {
                author: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                },
                _count: {
                    select: {
                        likes: true,
                        comments: true,
                    },
                },
            },
        });
        if (!post) {
            throw new common_1.NotFoundException('Post not found');
        }
        let isLiked = false;
        if (userId) {
            const like = await this.prisma.like.findUnique({
                where: {
                    userId_postId: {
                        userId,
                        postId: id,
                    },
                },
            });
            isLiked = !!like;
        }
        return {
            ...post,
            isLiked,
        };
    }
    async update(id, userId, updatePostDto) {
        const post = await this.prisma.post.findUnique({
            where: { id },
        });
        if (!post) {
            throw new common_1.NotFoundException('Post not found');
        }
        if (post.authorId !== userId) {
            throw new common_1.ForbiddenException('You can only update your own posts');
        }
        const updatedPost = await this.prisma.post.update({
            where: { id },
            data: updatePostDto,
            include: {
                author: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                },
                _count: {
                    select: {
                        likes: true,
                        comments: true,
                    },
                },
            },
        });
        return updatedPost;
    }
    async remove(id, userId) {
        const post = await this.prisma.post.findUnique({
            where: { id },
        });
        if (!post) {
            throw new common_1.NotFoundException('Post not found');
        }
        if (post.authorId !== userId) {
            throw new common_1.ForbiddenException('You can only delete your own posts');
        }
        await this.prisma.post.delete({
            where: { id },
        });
        return { message: 'Post deleted successfully' };
    }
    async toggleLike(postId, userId) {
        const post = await this.prisma.post.findUnique({
            where: { id: postId },
        });
        if (!post) {
            throw new common_1.NotFoundException('Post not found');
        }
        const existingLike = await this.prisma.like.findUnique({
            where: {
                userId_postId: {
                    userId,
                    postId,
                },
            },
        });
        if (existingLike) {
            await this.prisma.like.delete({
                where: {
                    id: existingLike.id,
                },
            });
            return { liked: false, message: 'Post unliked' };
        }
        else {
            await this.prisma.like.create({
                data: {
                    userId,
                    postId,
                },
            });
            return { liked: true, message: 'Post liked' };
        }
    }
    async getLikes(postId) {
        const likes = await this.prisma.like.findMany({
            where: { postId },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                },
            },
        });
        return {
            count: likes.length,
            users: likes.map((like) => like.user),
        };
    }
};
exports.PostsService = PostsService;
exports.PostsService = PostsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PostsService);
//# sourceMappingURL=posts.service.js.map