"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const fs = require("fs");
const path = require("path");
const Handlebars = require("handlebars");
const nodemailer = require('nodemailer');
let EmailService = class EmailService {
    configService;
    constructor(configService) {
        this.configService = configService;
    }
    async sendEmail(recipient, name, subject, templateFile, templateData) {
        const domain = this.configService.get('BREVO_DOMAIN') || 'https://api.brevo.com/v3/smtp/email';
        const apiKey = this.configService.get('BREVO_API_KEY');
        const senderEmail = this.configService.get('BREVO_SENDER_EMAIL');
        const senderName = this.configService.get('BREVO_SENDER_NAME');
        if (!apiKey || !senderEmail || !senderName) {
            throw new Error('Missing Brevo configuration (API key, sender email, or sender name)');
        }
        const templatePath = path.join(__dirname, '../../../emailTemplate', templateFile);
        const templateContent = fs.readFileSync(templatePath, 'utf8');
        const compiledEmailTemplate = Handlebars.compile(templateContent);
        const htmlToSend = compiledEmailTemplate(templateData);
        const myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        myHeaders.append('api-key', apiKey);
        const sender = {
            email: senderEmail,
            name: senderName,
        };
        const towho = [{ name, email: recipient }];
        const sendinBlueEmailModel = {
            sender,
            subject,
            to: towho,
            htmlContent: htmlToSend,
        };
        const raw = JSON.stringify(sendinBlueEmailModel);
        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
        };
        try {
            const response = await fetch(domain, requestOptions);
            if (!response.ok) {
                throw new Error(`Failed to send email: ${await response.text()}`);
            }
            const result = await response.json();
            console.log(`${subject} email sent:`, result);
            return result;
            let message = {
                from: name,
                to: recipient,
                subject: subject,
                html: htmlToSend
            };
        }
        catch (error) {
            console.error(`Error sending ${subject} email:`, error);
            throw error;
        }
    }
    async ConfirmEmail_Brevo(recipient, name, url) {
        const data = {
            callback: url,
            name,
        };
        return this.sendEmail(recipient, name, 'Email Confirmation', 'ConfirmEmail.html', data);
    }
    async ResetPassword_Brevo(recipient, name, resetCode) {
        const frontendUrl = this.configService.get('FRONTEND_BASE_URL');
        const data = {
            resetCode,
            name,
            resetLink: `${frontendUrl}/reset-password?code=${resetCode}`,
        };
        return this.sendEmail(recipient, name, 'Password Reset Request', 'PasswordReset.html', data);
    }
};
exports.EmailService = EmailService;
exports.EmailService = EmailService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], EmailService);
//# sourceMappingURL=email.service..js.map