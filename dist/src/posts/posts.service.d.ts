import { PrismaService } from '../prisma/prisma.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
export declare class PostsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(userId: string, createPostDto: CreatePostDto): Promise<{
        author: {
            id: string;
            email: string;
            name: string;
        };
        _count: {
            comments: number;
            likes: number;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        content: string;
        tags: string[];
        authorId: string;
    }>;
    findAll(search?: string, sortBy?: string): Promise<({
        author: {
            id: string;
            email: string;
            name: string;
        };
        _count: {
            comments: number;
            likes: number;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        content: string;
        tags: string[];
        authorId: string;
    })[]>;
    findOne(id: string, userId?: string): Promise<{
        isLiked: boolean;
        author: {
            id: string;
            email: string;
            name: string;
        };
        _count: {
            comments: number;
            likes: number;
        };
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        content: string;
        tags: string[];
        authorId: string;
    }>;
    update(id: string, userId: string, updatePostDto: UpdatePostDto): Promise<{
        author: {
            id: string;
            email: string;
            name: string;
        };
        _count: {
            comments: number;
            likes: number;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        content: string;
        tags: string[];
        authorId: string;
    }>;
    remove(id: string, userId: string): Promise<{
        message: string;
    }>;
    toggleLike(postId: string, userId: string): Promise<{
        liked: boolean;
        message: string;
    }>;
    getLikes(postId: string): Promise<{
        count: number;
        users: {
            id: string;
            email: string;
            name: string;
        }[];
    }>;
}
