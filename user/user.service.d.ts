import { IRegisterUser } from './interfaces/register-user.interface';
import { IaResponse } from 'src/SharedKernel/Interfaces/IAresponse';
import { EmailService } from '../infrastructure/Services/email.service.';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { ILoginUser } from 'src/identity/interface/login.user.interface';
import { JwtService } from '@nestjs/jwt';
export declare class UserService {
    private usersRepo;
    private jwtService;
    private readonly emailService;
    constructor(usersRepo: Repository<User>, jwtService: JwtService, emailService: EmailService);
    createUser(req: IRegisterUser): Promise<IaResponse<string>>;
    findByUsername(email: string): Promise<User | null>;
    findById(id: string): Promise<User | null>;
    login(req: ILoginUser, res: Response): Promise<IaResponse<string>>;
    forgotPassword(email: string): Promise<IaResponse<string>>;
    private sendResetEmail;
    deleteUser(userId: string): Promise<IaResponse<string>>;
}
