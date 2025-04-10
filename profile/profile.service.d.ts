import { Repository } from 'typeorm';
import { User } from '../user/user.entity';
import { JwtService } from '@nestjs/jwt';
import { IUpdateProfile } from '../user/interfaces/profile.interfaces';
export interface IaResponse<T> {
    successful: boolean;
    message: string;
    data: T | null;
}
export declare class ProfileService {
    private usersRepo;
    private jwtService;
    constructor(usersRepo: Repository<User>, jwtService: JwtService);
    getProfile(userId: string): Promise<IaResponse<User>>;
    updateProfile(userId: string, req: IUpdateProfile): Promise<IaResponse<any>>;
    updateByUserId(userId: string, creteria: any): Promise<void>;
    getProfileWithToken(userId: string): Promise<IaResponse<User>>;
}
