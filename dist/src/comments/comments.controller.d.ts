import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
export declare class CommentsController {
    private readonly commentsService;
    constructor(commentsService: CommentsService);
    create(req: any, createCommentDto: CreateCommentDto): Promise<{
        author: {
            id: string;
            email: string;
            name: string;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        content: string;
        authorId: string;
        postId: string;
    }>;
    findByPost(postId: string): Promise<({
        author: {
            id: string;
            email: string;
            name: string;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        content: string;
        authorId: string;
        postId: string;
    })[]>;
    update(id: string, req: any, updateCommentDto: UpdateCommentDto): Promise<{
        author: {
            id: string;
            email: string;
            name: string;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        content: string;
        authorId: string;
        postId: string;
    }>;
    remove(id: string, req: any): Promise<{
        message: string;
    }>;
}
