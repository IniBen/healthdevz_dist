import { ProfileService } from './profile.service';
import { IUpdateProfile } from 'src/user/interfaces/profile.interfaces';
export declare class ProfileController {
    private readonly profileService;
    constructor(profileService: ProfileService);
    getProfile(req: any): Promise<import("./profile.service").IaResponse<import("../user/user.entity").User>>;
    updateProfile(req: any, data: IUpdateProfile): Promise<import("./profile.service").IaResponse<any>>;
}
