import { UserService } from './user.service';
import { IRegisterUser } from 'src/user/interfaces/register-user.interface';
import { ILoginUser } from '../identity/interface/login.user.interface';
export declare class UserController {
    private usersService;
    constructor(usersService: UserService);
    createUser(body: IRegisterUser, res: any): Promise<any>;
    login(body: ILoginUser, res: any): Promise<any>;
    getProfile(req: any): Promise<import("./user.entity").User | null>;
    forgotPassword(email: string, res: any): Promise<any>;
    deleteUser(userId: string, req: any, res: any): Promise<any>;
}
