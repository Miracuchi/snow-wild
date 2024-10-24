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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateUserWithoutPassword = exports.InputAdminUpdateUser = exports.InputAdminCreateUser = exports.InputChangePassword = exports.InputRegisterWithoutPassword = exports.InputRegister = exports.InputLogin = exports.UserWithoutPassword = exports.UserAfterLogin = exports.Message = void 0;
const argon2 = __importStar(require("argon2"));
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const class_validator_1 = require("class-validator");
const types_1 = require("../types");
const reservation_entity_1 = __importDefault(require("./reservation.entity"));
// =================================================================
//                           OBJECT TYPE
// =================================================================
let User = class User {
    async hashPassword() {
        if (!this.password.startsWith('$argon2')) {
            this.password = await argon2.hash(this.password);
        }
    }
};
__decorate([
    (0, typeorm_1.BeforeInsert)(),
    (0, typeorm_1.BeforeUpdate)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], User.prototype, "hashPassword", null);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], User.prototype, "id", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [reservation_entity_1.default]),
    (0, typeorm_1.JoinColumn)(),
    (0, typeorm_1.OneToMany)(() => reservation_entity_1.default, (r) => r.user),
    __metadata("design:type", Array)
], User.prototype, "reservations", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "firstName", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "lastName", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typeorm_1.Column)({ nullable: false, unique: true }),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typeorm_1.Column)(),
    (0, class_validator_1.Min)(10),
    (0, class_validator_1.Max)(10),
    __metadata("design:type", String)
], User.prototype, "phone", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typeorm_1.Column)({
        type: 'text',
        enum: ['ADMIN', 'USER'],
        nullable: true,
        default: types_1.UserRoleEnum.user,
    }),
    __metadata("design:type", String)
], User.prototype, "role", void 0);
User = __decorate([
    (0, type_graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)()
], User);
exports.default = User;
let Message = class Message {
};
exports.Message = Message;
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Boolean)
], Message.prototype, "success", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], Message.prototype, "message", void 0);
exports.Message = Message = __decorate([
    (0, type_graphql_1.ObjectType)()
], Message);
let UserAfterLogin = class UserAfterLogin {
};
exports.UserAfterLogin = UserAfterLogin;
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", User)
], UserAfterLogin.prototype, "user", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Boolean)
], UserAfterLogin.prototype, "success", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], UserAfterLogin.prototype, "message", void 0);
exports.UserAfterLogin = UserAfterLogin = __decorate([
    (0, type_graphql_1.ObjectType)()
], UserAfterLogin);
let UserWithoutPassword = class UserWithoutPassword {
};
exports.UserWithoutPassword = UserWithoutPassword;
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], UserWithoutPassword.prototype, "id", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], UserWithoutPassword.prototype, "email", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    __metadata("design:type", String)
], UserWithoutPassword.prototype, "role", void 0);
exports.UserWithoutPassword = UserWithoutPassword = __decorate([
    (0, type_graphql_1.ObjectType)()
], UserWithoutPassword);
let InputLogin = class InputLogin {
};
exports.InputLogin = InputLogin;
__decorate([
    (0, type_graphql_1.Field)({ nullable: false }),
    __metadata("design:type", String)
], InputLogin.prototype, "email", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: false }),
    __metadata("design:type", String)
], InputLogin.prototype, "password", void 0);
exports.InputLogin = InputLogin = __decorate([
    (0, type_graphql_1.InputType)()
], InputLogin);
// =================================================================
//                           INPUT TYPE
// =================================================================
let InputRegister = class InputRegister extends User {
};
exports.InputRegister = InputRegister;
__decorate([
    (0, type_graphql_1.Field)({ nullable: false }),
    __metadata("design:type", String)
], InputRegister.prototype, "firstName", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: false }),
    __metadata("design:type", String)
], InputRegister.prototype, "lastName", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: false }),
    __metadata("design:type", String)
], InputRegister.prototype, "email", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: false }),
    __metadata("design:type", String)
], InputRegister.prototype, "password", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: false }),
    __metadata("design:type", String)
], InputRegister.prototype, "phone", void 0);
exports.InputRegister = InputRegister = __decorate([
    (0, type_graphql_1.InputType)()
], InputRegister);
let InputRegisterWithoutPassword = class InputRegisterWithoutPassword {
};
exports.InputRegisterWithoutPassword = InputRegisterWithoutPassword;
__decorate([
    (0, type_graphql_1.Field)({ nullable: false }),
    __metadata("design:type", String)
], InputRegisterWithoutPassword.prototype, "email", void 0);
exports.InputRegisterWithoutPassword = InputRegisterWithoutPassword = __decorate([
    (0, type_graphql_1.InputType)()
], InputRegisterWithoutPassword);
let InputChangePassword = class InputChangePassword {
};
exports.InputChangePassword = InputChangePassword;
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], InputChangePassword.prototype, "token", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: false }),
    __metadata("design:type", String)
], InputChangePassword.prototype, "password", void 0);
exports.InputChangePassword = InputChangePassword = __decorate([
    (0, type_graphql_1.InputType)()
], InputChangePassword);
let InputAdminCreateUser = class InputAdminCreateUser {
};
exports.InputAdminCreateUser = InputAdminCreateUser;
__decorate([
    (0, type_graphql_1.Field)({ nullable: false }),
    __metadata("design:type", String)
], InputAdminCreateUser.prototype, "firstName", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: false }),
    __metadata("design:type", String)
], InputAdminCreateUser.prototype, "lastName", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: false }),
    __metadata("design:type", String)
], InputAdminCreateUser.prototype, "email", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: false }),
    __metadata("design:type", String)
], InputAdminCreateUser.prototype, "password", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: false }),
    __metadata("design:type", String)
], InputAdminCreateUser.prototype, "phone", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: false }),
    __metadata("design:type", String)
], InputAdminCreateUser.prototype, "role", void 0);
exports.InputAdminCreateUser = InputAdminCreateUser = __decorate([
    (0, type_graphql_1.InputType)()
], InputAdminCreateUser);
let InputAdminUpdateUser = class InputAdminUpdateUser extends User {
};
exports.InputAdminUpdateUser = InputAdminUpdateUser;
__decorate([
    (0, type_graphql_1.Field)({ nullable: false }),
    __metadata("design:type", String)
], InputAdminUpdateUser.prototype, "firstName", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: false }),
    __metadata("design:type", String)
], InputAdminUpdateUser.prototype, "lastName", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: false }),
    __metadata("design:type", String)
], InputAdminUpdateUser.prototype, "email", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: false }),
    __metadata("design:type", String)
], InputAdminUpdateUser.prototype, "password", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: false }),
    __metadata("design:type", String)
], InputAdminUpdateUser.prototype, "phone", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: false }),
    __metadata("design:type", String)
], InputAdminUpdateUser.prototype, "role", void 0);
exports.InputAdminUpdateUser = InputAdminUpdateUser = __decorate([
    (0, type_graphql_1.InputType)()
], InputAdminUpdateUser);
let UpdateUserWithoutPassword = class UpdateUserWithoutPassword {
};
exports.UpdateUserWithoutPassword = UpdateUserWithoutPassword;
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], UpdateUserWithoutPassword.prototype, "id", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], UpdateUserWithoutPassword.prototype, "firstName", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], UpdateUserWithoutPassword.prototype, "lastName", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], UpdateUserWithoutPassword.prototype, "email", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], UpdateUserWithoutPassword.prototype, "phone", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    __metadata("design:type", String)
], UpdateUserWithoutPassword.prototype, "role", void 0);
exports.UpdateUserWithoutPassword = UpdateUserWithoutPassword = __decorate([
    (0, type_graphql_1.ObjectType)()
], UpdateUserWithoutPassword);
