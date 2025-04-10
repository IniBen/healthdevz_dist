"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IdentityModule = void 0;
const common_1 = require("@nestjs/common");
const identity_service_1 = require("./identity.service");
const user_module_1 = require("../user/user.module");
const identity_controller_1 = require("./identity.controller");
const jwt_1 = require("@nestjs/jwt");
const passport_1 = require("@nestjs/passport");
const constants_1 = require("./constants");
const jwt_strategy_1 = require("./jwt.strategy");
const user_service_1 = require("../user/user.service");
const typeorm_module_1 = require("@nestjs/typeorm/dist/typeorm.module");
const user_entity_1 = require("../user/user.entity");
const email_service_1 = require("../infrastructure/Services/email.service.");
let IdentityModule = class IdentityModule {
};
exports.IdentityModule = IdentityModule;
exports.IdentityModule = IdentityModule = __decorate([
    (0, common_1.Module)({
        imports: [
            user_module_1.UserModule,
            passport_1.PassportModule,
            typeorm_module_1.TypeOrmModule.forFeature([user_entity_1.User]),
            jwt_1.JwtModule.register({
                secret: constants_1.jwtConstants.secret,
                signOptions: { expiresIn: '1h' },
            }),
        ],
        providers: [user_service_1.UserService, identity_service_1.IdentityService, jwt_strategy_1.JwtStrategy, email_service_1.EmailService],
        controllers: [identity_controller_1.IdentityController],
        exports: [identity_service_1.IdentityService]
    })
], IdentityModule);
//# sourceMappingURL=identity.module.js.map