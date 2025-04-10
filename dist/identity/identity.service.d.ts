import { ILoginUser } from './interface/login.user.interface';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { User } from 'src/user/user.entity';
import { IaResponse } from 'src/SharedKernel/Interfaces/IAresponse';
export declare class IdentityService {
    private usersRepo;
    private usersService;
    private jwtService;
    constructor(usersRepo: Repository<User>, usersService: UserService, jwtService: JwtService);
    validateUser(req: ILoginUser): Promise<any>;
    login(user: any): Promise<{
        access_token: string;
    }>;
    verifyToken(userid: string, tokenmail: string): Promise<IaResponse<any>>;
}
