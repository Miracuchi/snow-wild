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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminUpdateCategoryOutput = exports.AdminUpdateCategoryInput = exports.CreateCategoryInput = void 0;
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const material_entity_1 = __importDefault(require("./material.entity"));
let Category = class Category {
};
__decorate([
    (0, type_graphql_1.Field)(() => type_graphql_1.ID),
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Category.prototype, "id", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], Category.prototype, "name", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [material_entity_1.default]),
    (0, typeorm_1.JoinColumn)(),
    (0, typeorm_1.OneToMany)(() => material_entity_1.default, (m) => m.category),
    __metadata("design:type", Array)
], Category.prototype, "material", void 0);
Category = __decorate([
    (0, type_graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)()
], Category);
exports.default = Category;
let CreateCategoryInput = class CreateCategoryInput {
};
exports.CreateCategoryInput = CreateCategoryInput;
__decorate([
    (0, type_graphql_1.Field)({ nullable: false }),
    __metadata("design:type", String)
], CreateCategoryInput.prototype, "name", void 0);
exports.CreateCategoryInput = CreateCategoryInput = __decorate([
    (0, type_graphql_1.InputType)()
], CreateCategoryInput);
let AdminUpdateCategoryInput = class AdminUpdateCategoryInput {
};
exports.AdminUpdateCategoryInput = AdminUpdateCategoryInput;
__decorate([
    (0, type_graphql_1.Field)({ nullable: false }),
    __metadata("design:type", String)
], AdminUpdateCategoryInput.prototype, "id", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: false }),
    __metadata("design:type", String)
], AdminUpdateCategoryInput.prototype, "name", void 0);
exports.AdminUpdateCategoryInput = AdminUpdateCategoryInput = __decorate([
    (0, type_graphql_1.InputType)()
], AdminUpdateCategoryInput);
let AdminUpdateCategoryOutput = class AdminUpdateCategoryOutput {
};
exports.AdminUpdateCategoryOutput = AdminUpdateCategoryOutput;
__decorate([
    (0, type_graphql_1.Field)({ nullable: false }),
    __metadata("design:type", String)
], AdminUpdateCategoryOutput.prototype, "id", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: false }),
    __metadata("design:type", String)
], AdminUpdateCategoryOutput.prototype, "name", void 0);
exports.AdminUpdateCategoryOutput = AdminUpdateCategoryOutput = __decorate([
    (0, type_graphql_1.ObjectType)()
], AdminUpdateCategoryOutput);
