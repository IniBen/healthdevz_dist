import { IdentityService } from './identity.service';
import { UserService } from 'src/user/user.service';
import { Response } from 'express';
import { IRegisterUser } from 'src/user/interfaces/register-user.interface';
import { ILoginUser } from './interface/login.user.interface';
import { IVerifyUser } from './interface/verify.user.interface';
export declare class IdentityController {
    private readonly authService;
    private usersService;
    constructor(authService: IdentityService, usersService: UserService);
    register(body: IRegisterUser, res: Response): Promise<Response<any, Record<string, any>>>;
    login(body: ILoginUser, res: Response): Promise<Response<any, Record<string, any>>>;
    verify(req: IVerifyUser, res: Response): Promise<Response<any, Record<string, any>>>;
}
