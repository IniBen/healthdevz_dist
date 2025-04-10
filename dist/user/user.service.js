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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const common_2 = require("@nestjs/common");
const email_service_1 = require("../infrastructure/Services/email.service.");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("./user.entity");
const generateCode_1 = require("../utilities/generateCode");
const jwt_1 = require("@nestjs/jwt");
const randomGenerator_1 = require("../utilities/randomGenerator");
const crypto_1 = require("../utilities/crypto");
let UserService = class UserService {
    usersRepo;
    jwtService;
    emailService;
    constructor(usersRepo, jwtService, emailService) {
        this.usersRepo = usersRepo;
        this.jwtService = jwtService;
        this.emailService = emailService;
    }
    async createUser(req) {
        const aResponse = {
            successful: false,
            message: "",
            data: ""
        };
        try {
            const existingUser = await this.findByUsername(req.email);
            if (existingUser) {
                throw new common_2.HttpException("Email already exists.", common_2.HttpStatus.NOT_FOUND);
            }
            const generatedToken = (0, generateCode_1.generateConfirmationCode)();
            const { hash, salt } = await (0, crypto_1.hashPassword)(req.password);
            const useridentity = (0, randomGenerator_1.generateGUID)();
            const user = this.usersRepo.create({ email: req.email, id: useridentity, password: hash, token: generatedToken, psalt: salt });
            this.usersRepo.save(user);
            console.log("User created successfully", user);
            const url = `${process.env.FRONTEND_BASE_URL}/Auth/Confirm?user=${user.id}&verify=${generatedToken}`;
            await this.emailService.ConfirmEmail_Brevo(req.email, req.email, url);
            aResponse.data = req.email;
            aResponse.message = "User created successfully";
            aResponse.successful = true;
            return aResponse;
        }
        catch (error) {
            aResponse.message = error.message;
            aResponse.successful = false;
            return aResponse;
        }
    }
    async findByUsername(email) {
        return await this.usersRepo.findOne({ where: { email } });
    }
    async findById(id) {
        return await this.usersRepo.findOne({ where: { id } });
    }
    async login(req, res) {
        const aResponse = {
            successful: false,
            message: '',
            data: '',
        };
        try {
            const user = await this.findByUsername(req.email);
            if (!user) {
                throw new common_2.HttpException('User not found', common_2.HttpStatus.NOT_FOUND);
            }
            if (!user.psalt) {
                throw new common_2.HttpException('User salt missing', common_2.HttpStatus.INTERNAL_SERVER_ERROR);
            }
            const isPasswordValid = await (0, crypto_1.verifyPassword)(req.password, user.password, user.psalt);
            if (!isPasswordValid) {
                throw new common_2.HttpException('Invalid password', common_2.HttpStatus.UNAUTHORIZED);
            }
            const payload = { email: user.email, sub: user.id };
            const token = this.jwtService.sign(payload);
            aResponse.data = token;
            aResponse.message = 'Login successful';
            aResponse.successful = true;
            return aResponse;
        }
        catch (error) {
            aResponse.message = error instanceof common_2.HttpException ? error.message : 'Login failed';
            aResponse.successful = false;
            return aResponse;
        }
    }
    async forgotPassword(email) {
        const aResponse = {
            successful: false,
            message: '',
            data: '',
        };
        try {
            const user = await this.findByUsername(email);
            if (!user) {
                throw new common_2.HttpException('User not found', common_2.HttpStatus.NOT_FOUND);
            }
            const generatedToken = (0, generateCode_1.generateConfirmationCode)();
            user.token = generatedToken;
            await this.usersRepo.save(user);
            const url = `${process.env.FRONTEND_BASE_URL}/Auth/Confirm?user=${user.id}&verify=${generatedToken}`;
            await this.sendResetEmail(user.email, url);
            aResponse.data = generatedToken;
            aResponse.message = 'Password reset token generated. Check your email.';
            aResponse.successful = true;
            return aResponse;
        }
        catch (error) {
            aResponse.message = error.message;
            aResponse.successful = false;
            return aResponse;
        }
    }
    async sendResetEmail(email, resetToken) {
        await this.emailService.ResetPassword_Brevo(email, email, resetToken);
    }
    async deleteUser(userId) {
        const aResponse = {
            successful: false,
            message: "",
            data: ""
        };
        try {
            const user = await this.usersRepo.findOne({ where: { id: userId } });
            if (!user) {
                throw new common_2.HttpException("User not found", common_2.HttpStatus.NOT_FOUND);
            }
            await this.usersRepo.delete(userId);
            aResponse.data = userId;
            aResponse.message = "User deleted successfully";
            aResponse.successful = true;
            return aResponse;
        }
        catch (error) {
            aResponse.message = error.message;
            aResponse.successful = false;
            return aResponse;
        }
    }
};
exports.UserService = UserService;
__decorate([
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Response]),
    __metadata("design:returntype", Promise)
], UserService.prototype, "login", null);
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        jwt_1.JwtService, email_service_1.EmailService])
], UserService);
//# sourceMappingURL=user.service.js.map