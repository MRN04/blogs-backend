import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
export declare class PostsController {
    private readonly postsService;
    constructor(postsService: PostsService);
    create(req: any, createPostDto: CreatePostDto): Promise<{
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
    findOne(id: string, req: any): Promise<{
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
    update(id: string, req: any, updatePostDto: UpdatePostDto): Promise<{
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
    remove(id: string, req: any): Promise<{
        message: string;
    }>;
    toggleLike(id: string, req: any): Promise<{
        liked: boolean;
        message: string;
    }>;
    getLikes(id: string): Promise<{
        count: number;
        users: {
            id: string;
            email: string;
            name: string;
        }[];
    }>;
}
