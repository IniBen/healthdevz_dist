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
exports.IdentityController = void 0;
const common_1 = require("@nestjs/common");
const identity_service_1 = require("./identity.service");
const user_service_1 = require("../user/user.service");
let IdentityController = class IdentityController {
    authService;
    usersService;
    constructor(authService, usersService) {
        this.authService = authService;
        this.usersService = usersService;
    }
    async register(body, res) {
        const response = await this.usersService.createUser(body);
        return res.send(response);
    }
    async login(body, res) {
        try {
            const user = await this.authService.validateUser(body);
            var loginResult = this.authService.login(user);
            var token = (await loginResult).access_token;
            const response = {
                message: "successfully retrieved JWT",
                data: token,
                successful: true
            };
            return res.status(common_1.HttpStatus.OK).send(response);
        }
        catch (error) {
            const response = {
                message: error.message,
                data: null,
                successful: false
            };
            return res.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).send(response);
        }
    }
    async verify(req, res) {
        const response = await this.authService.verifyToken(req.userid, req.token);
        return res.status(common_1.HttpStatus.OK).send(response);
    }
};
exports.IdentityController = IdentityController;
__decorate([
    (0, common_1.Post)('register'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], IdentityController.prototype, "register", null);
__decorate([
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], IdentityController.prototype, "login", null);
__decorate([
    (0, common_1.Post)('verify'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], IdentityController.prototype, "verify", null);
exports.IdentityController = IdentityController = __decorate([
    (0, common_1.Controller)('identity'),
    __metadata("design:paramtypes", [identity_service_1.IdentityService, user_service_1.UserService])
], IdentityController);
//# sourceMappingURL=identity.controller.js.map