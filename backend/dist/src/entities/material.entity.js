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
exports.UpdateMaterialInput = exports.CreateMaterialInput = exports.PartialCategoryInput = void 0;
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const category_entity_1 = __importDefault(require("./category.entity"));
const reservation_material_entity_1 = require("./reservation_material.entity");
// =================================================================
//                           OBJECT TYPE
// =================================================================
let Material = class Material {
};
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Material.prototype, "id", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typeorm_1.Column)({ length: 50 }),
    __metadata("design:type", String)
], Material.prototype, "name", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Material.prototype, "picture", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => type_graphql_1.Float, { nullable: false }),
    (0, typeorm_1.Column)('decimal', { precision: 5, scale: 2 }),
    __metadata("design:type", Number)
], Material.prototype, "price", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Material.prototype, "description", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [SizeQuantity]),
    (0, typeorm_1.Column)('json'),
    __metadata("design:type", Array)
], Material.prototype, "sizes", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => category_entity_1.default),
    (0, typeorm_1.ManyToOne)(() => category_entity_1.default, (c) => c.material, {
        cascade: true,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        nullable: true,
    }),
    __metadata("design:type", category_entity_1.default)
], Material.prototype, "category", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [reservation_material_entity_1.ReservationMaterial]),
    (0, typeorm_1.JoinColumn)(),
    (0, typeorm_1.OneToMany)(() => reservation_material_entity_1.ReservationMaterial, (r) => r.material),
    __metadata("design:type", Array)
], Material.prototype, "reservationMaterials", void 0);
Material = __decorate([
    (0, type_graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)()
], Material);
exports.default = Material;
let SizeQuantity = class SizeQuantity {
};
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], SizeQuantity.prototype, "size", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Number)
], SizeQuantity.prototype, "quantity", void 0);
SizeQuantity = __decorate([
    (0, type_graphql_1.ObjectType)()
], SizeQuantity);
let PartialCategoryInput = class PartialCategoryInput {
};
exports.PartialCategoryInput = PartialCategoryInput;
__decorate([
    (0, type_graphql_1.Field)(() => type_graphql_1.ID),
    __metadata("design:type", String)
], PartialCategoryInput.prototype, "id", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], PartialCategoryInput.prototype, "name", void 0);
exports.PartialCategoryInput = PartialCategoryInput = __decorate([
    (0, type_graphql_1.InputType)()
], PartialCategoryInput);
let CreateMaterialInput = class CreateMaterialInput {
};
exports.CreateMaterialInput = CreateMaterialInput;
__decorate([
    (0, type_graphql_1.Field)({ nullable: false }),
    __metadata("design:type", String)
], CreateMaterialInput.prototype, "name", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], CreateMaterialInput.prototype, "description", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => type_graphql_1.Float, { nullable: false }),
    __metadata("design:type", Number)
], CreateMaterialInput.prototype, "price", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], CreateMaterialInput.prototype, "picture", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [SizeInput], { nullable: false }),
    __metadata("design:type", Array)
], CreateMaterialInput.prototype, "sizes", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: false }),
    __metadata("design:type", PartialCategoryInput)
], CreateMaterialInput.prototype, "category", void 0);
exports.CreateMaterialInput = CreateMaterialInput = __decorate([
    (0, type_graphql_1.InputType)()
], CreateMaterialInput);
let SizeInput = class SizeInput {
};
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], SizeInput.prototype, "size", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Number)
], SizeInput.prototype, "quantity", void 0);
SizeInput = __decorate([
    (0, type_graphql_1.InputType)() // Définissez un InputType pour représenter chaque taille avec sa quantité
], SizeInput);
let UpdateMaterialInput = class UpdateMaterialInput {
};
exports.UpdateMaterialInput = UpdateMaterialInput;
__decorate([
    (0, type_graphql_1.Field)(() => type_graphql_1.ID),
    __metadata("design:type", String)
], UpdateMaterialInput.prototype, "id", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], UpdateMaterialInput.prototype, "name", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], UpdateMaterialInput.prototype, "description", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => type_graphql_1.Float, { nullable: true }),
    __metadata("design:type", Number)
], UpdateMaterialInput.prototype, "quantity", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => type_graphql_1.Float, { nullable: true }),
    __metadata("design:type", Number)
], UpdateMaterialInput.prototype, "price", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], UpdateMaterialInput.prototype, "picture", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", PartialCategoryInput)
], UpdateMaterialInput.prototype, "category", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [SizeInput], { nullable: false }),
    __metadata("design:type", Array)
], UpdateMaterialInput.prototype, "sizes", void 0);
exports.UpdateMaterialInput = UpdateMaterialInput = __decorate([
    (0, type_graphql_1.InputType)()
], UpdateMaterialInput);
