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
exports.ProfileService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("../user/user.entity");
const jwt_1 = require("@nestjs/jwt");
const onboarding_1 = require("../user/core/enum/onboarding");
let ProfileService = class ProfileService {
    usersRepo;
    jwtService;
    constructor(usersRepo, jwtService) {
        this.usersRepo = usersRepo;
        this.jwtService = jwtService;
    }
    async getProfile(userId) {
        const aResponse = {
            successful: false,
            message: '',
            data: null,
        };
        try {
            const user = await this.usersRepo.findOne({ where: { id: userId } });
            if (!user) {
                throw new common_1.HttpException('User not found', common_1.HttpStatus.NOT_FOUND);
            }
            aResponse.data = user;
            aResponse.message = 'Profile retrieved successfully';
            aResponse.successful = true;
            return aResponse;
        }
        catch (error) {
            aResponse.message = error.message;
            aResponse.successful = false;
            return aResponse;
        }
    }
    async updateProfile(userId, req) {
        const aResponse = {
            successful: false,
            message: '',
            data: null,
        };
        try {
            const user = await this.usersRepo.findOne({ where: { id: userId } });
            if (!user) {
                throw new common_1.HttpException('User not found', common_1.HttpStatus.NOT_FOUND);
            }
            const updateprofile = {
                firstname: req.firstname ?? user.firstname,
                lastname: req.lastname ?? user.lastname,
                onboardingLevel: onboarding_1.OnboardingLevel.Completed,
                role: req.role ?? user.role,
                country: req.country ?? user.country,
                city: req.city ?? user.city,
                address: req.address ?? user.address,
                phone: req.phone ?? user.phone,
                bio: req.bio ?? user.bio
            };
            this.updateByUserId(userId, updateprofile);
            aResponse.data = "Profile updated successfully";
            aResponse.message = 'Profile updated successfully';
            aResponse.successful = true;
            return aResponse;
        }
        catch (error) {
            aResponse.message = error.message;
            aResponse.successful = false;
            return aResponse;
        }
    }
    async updateByUserId(userId, creteria) {
        this.usersRepo.update({ id: userId }, creteria);
    }
    async getProfileWithToken(userId) {
        const aResponse = {
            successful: false,
            message: '',
            data: null,
        };
        try {
            const user = await this.usersRepo.findOne({ where: { id: userId } });
            if (!user) {
                throw new common_1.HttpException('User not found', common_1.HttpStatus.NOT_FOUND);
            }
            aResponse.data = user;
            aResponse.message = 'Profile retrieved successfully';
            aResponse.successful = true;
            return aResponse;
        }
        catch (error) {
            aResponse.message = 'Invalid token or user not found';
            aResponse.successful = false;
            return aResponse;
        }
    }
};
exports.ProfileService = ProfileService;
exports.ProfileService = ProfileService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        jwt_1.JwtService])
], ProfileService);
//# sourceMappingURL=profile.service.js.map