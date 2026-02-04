import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
export declare class AuthService {
    private prisma;
    private jwtService;
    constructor(prisma: PrismaService, jwtService: JwtService);
    register(registerDto: RegisterDto): Promise<{
        user: {
            id: string;
            email: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
        };
        token: string;
    }>;
    login(loginDto: LoginDto): Promise<{
        user: {
            id: string;
            email: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
        };
        token: string;
    }>;
    getMe(userId: string): Promise<{
        id: string;
        email: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
    } | null>;
    private generateToken;
}
