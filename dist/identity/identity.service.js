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
exports.IdentityService = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("../user/user.service");
const jwt_1 = require("@nestjs/jwt");
const crypto_1 = require("../utilities/crypto");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const user_entity_1 = require("../user/user.entity");
const onboarding_1 = require("../user/core/enum/onboarding");
let IdentityService = class IdentityService {
    usersRepo;
    usersService;
    jwtService;
    constructor(usersRepo, usersService, jwtService) {
        this.usersRepo = usersRepo;
        this.usersService = usersService;
        this.jwtService = jwtService;
    }
    async validateUser(req) {
        if (!req.email || !req.password) {
            throw new common_1.HttpException('Email and password are required', common_1.HttpStatus.BAD_REQUEST);
        }
        const user = await this.usersService.findByUsername(req.email);
        if (!user) {
            throw new common_1.HttpException('Invalid credentials', common_1.HttpStatus.UNAUTHORIZED);
        }
        if (!user.isVerified) {
            throw new common_1.HttpException('Unverified user email', common_1.HttpStatus.FORBIDDEN);
        }
        if (!user.psalt) {
            throw new common_1.HttpException('User salt missing', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
        try {
            const isValid = await (0, crypto_1.verifyPassword)(req.password, user.password, user.psalt);
            if (isValid) {
                const { password, psalt, ...result } = user;
                return result;
            }
            throw new common_1.HttpException('Invalid credentials', common_1.HttpStatus.UNAUTHORIZED);
        }
        catch (err) {
            throw new common_1.HttpException('Password verification failed', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async login(user) {
        const payload = { email: user.email, sub: user.id };
        return { access_token: this.jwtService.sign(payload) };
    }
    async verifyToken(userid, tokenmail) {
        const aResponse = {
            successful: false,
            message: '',
            data: null,
        };
        try {
            if (!userid || typeof userid !== 'string') {
                aResponse.message = 'Invalid or missing user ID';
                throw new common_1.HttpException(aResponse.message, common_1.HttpStatus.BAD_REQUEST);
            }
            if (!tokenmail || typeof tokenmail !== 'string') {
                aResponse.message = 'Invalid or missing token';
                throw new common_1.HttpException(aResponse.message, common_1.HttpStatus.BAD_REQUEST);
            }
            const user = await this.usersRepo.findOne({ where: { id: userid } });
            if (!user) {
                aResponse.message = 'User not found';
                throw new common_1.HttpException(aResponse.message, common_1.HttpStatus.NOT_FOUND);
            }
            if (user.isVerified) {
                aResponse.message = 'User email is already verified';
                throw new common_1.HttpException(aResponse.message, common_1.HttpStatus.CONFLICT);
            }
            const usertoken = await this.usersRepo.findOne({
                where: { token: tokenmail },
            });
            if (!usertoken) {
                aResponse.message = 'Invalid or expired token';
                throw new common_1.HttpException(aResponse.message, common_1.HttpStatus.NOT_FOUND);
            }
            if (usertoken.id !== user.id) {
                aResponse.message = 'Token does not match user';
                throw new common_1.HttpException(aResponse.message, common_1.HttpStatus.FORBIDDEN);
            }
            user.isVerified = true;
            usertoken.token = null;
            user.onboardingLevel = onboarding_1.OnboardingLevel.Profile;
            await this.usersRepo.manager.transaction(async (transactionalEntityManager) => {
                await transactionalEntityManager.save(user);
            });
            aResponse.successful = true;
            aResponse.message = 'User email verified successfully';
            aResponse.data = {
                id: user.id,
                email: user.email,
                isVerified: user.isVerified,
            };
            return aResponse;
        }
        catch (error) {
            if (error instanceof typeorm_1.QueryFailedError) {
                aResponse.message = 'Database error occurred while verifying token';
                throw new common_1.HttpException(aResponse, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            }
            if (error instanceof common_1.HttpException) {
                aResponse.message = error.message;
                throw new common_1.HttpException(aResponse, error.getStatus());
            }
            aResponse.message = 'An unexpected error occurred while verifying token';
            throw new common_1.HttpException(aResponse, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.IdentityService = IdentityService;
exports.IdentityService = IdentityService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_1.Repository, user_service_1.UserService, jwt_1.JwtService])
], IdentityService);
//# sourceMappingURL=identity.service.js.map