import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
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
    getMe(req: any): Promise<{
        id: string;
        email: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
    } | null>;
}
