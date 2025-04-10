import { ConfigService } from '@nestjs/config';
export declare class EmailService {
    private configService;
    constructor(configService: ConfigService);
    private sendEmail;
    ConfirmEmail_Brevo(recipient: string, name: string, url: string): Promise<any>;
    ResetPassword_Brevo(recipient: string, name: string, resetCode: string): Promise<any>;
}
