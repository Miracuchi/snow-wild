"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const argon2 = __importStar(require("argon2"));
const cookies_1 = __importDefault(require("cookies"));
const dotenv_1 = __importDefault(require("dotenv"));
const jose_1 = require("jose");
const type_graphql_1 = require("type-graphql");
const user_entity_1 = __importStar(require("../entities/user.entity"));
const user_service_1 = __importDefault(require("../services/user.service"));
dotenv_1.default.config();
let UserResolver = class UserResolver {
    async users() {
        return await new user_service_1.default().listUser();
    }
    async login(infos, ctx) {
        const user = await new user_service_1.default().findUserByEmail(infos.email);
        if (!user) {
            throw new Error('Vérifiez vos informations');
        }
        const isPasswordValid = await argon2.verify(user.password, infos.password);
        if (isPasswordValid) {
            console.log('JWT_SECRET_KEY', process.env.JWT_SECRET_KEY);
            const token = await new jose_1.SignJWT({
                email: user.email,
                role: user.role,
                userId: user.id,
            })
                .setProtectedHeader({
                alg: 'HS256',
                typ: 'jwt',
            })
                .setExpirationTime('2h')
                .sign(new TextEncoder().encode(process.env.JWT_SECRET_KEY));
            const cookies = new cookies_1.default(ctx.req, ctx.res);
            cookies.set('token', token, { httpOnly: true });
            console.log('token gen', token);
        }
        else {
            throw Error('Vérifiez vos informations');
        }
        return user;
    }
    async logout(ctx) {
        if (ctx.user) {
            const cookies = new cookies_1.default(ctx.req, ctx.res);
            cookies.set('token'); //sans valeur, le cookie token sera supprimé
        }
        const m = new user_entity_1.Message();
        m.message = 'Vous avez été déconnecté';
        m.success = true;
        return m;
    }
    async getUserById(id) {
        const user = await new user_service_1.default().findUserById(id);
        if (!user) {
            throw new Error('Pas de user avec cet Id');
        }
        return user;
    }
    async register(infos) {
        const user = await new user_service_1.default().findUserByEmail(infos.email);
        if (user) {
            throw new Error('Cet email est déjà pris!');
        }
        const hashPassword = await argon2.hash(infos.password);
        if (hashPassword) {
            infos.password = hashPassword;
        }
        const newUser = await new user_service_1.default().createUser(infos);
        return newUser;
    }
    async updateUser(infos, id) {
        const user = await new user_service_1.default().findUserByEmail(infos.email);
        if (user) {
            throw new Error('Cet email est déjà pris!');
        }
        const hashPassword = await argon2.hash(infos.password);
        if (hashPassword) {
            infos.password = hashPassword;
        }
        const newUser = await new user_service_1.default().updateUser(infos, id);
        return newUser;
    }
    async deleteAdminUser(id) {
        const deletedUser = await new user_service_1.default().adminDeleteUser(id);
        return deletedUser;
    }
    async adminCreateUser(infos) {
        const user = await new user_service_1.default().findUserByEmail(infos.email);
        if (user) {
            throw new Error('Cet email est déjà pris!');
        }
        const hashPassword = await argon2.hash(infos.password);
        if (hashPassword) {
            infos.password = hashPassword;
        }
        const newUser = await new user_service_1.default().createAdminUser(infos);
        return newUser;
    }
};
__decorate([
    (0, type_graphql_1.Query)(() => [user_entity_1.default]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "users", null);
__decorate([
    (0, type_graphql_1.Query)(() => user_entity_1.UserWithoutPassword),
    __param(0, (0, type_graphql_1.Arg)('infos')),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.InputLogin, Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "login", null);
__decorate([
    (0, type_graphql_1.Query)(() => user_entity_1.Message),
    __param(0, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "logout", null);
__decorate([
    (0, type_graphql_1.Query)(() => user_entity_1.default),
    __param(0, (0, type_graphql_1.Arg)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "getUserById", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => user_entity_1.UserWithoutPassword),
    __param(0, (0, type_graphql_1.Arg)('infos')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.InputRegister]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "register", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => user_entity_1.UpdateUserWithoutPassword),
    __param(0, (0, type_graphql_1.Arg)('infos')),
    __param(1, (0, type_graphql_1.Arg)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.InputAdminUpdateUser, String]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "updateUser", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => user_entity_1.default),
    __param(0, (0, type_graphql_1.Arg)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "deleteAdminUser", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => user_entity_1.UpdateUserWithoutPassword),
    __param(0, (0, type_graphql_1.Arg)('infos')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.InputAdminCreateUser]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "adminCreateUser", null);
UserResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], UserResolver);
exports.default = UserResolver;
