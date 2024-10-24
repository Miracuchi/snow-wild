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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const type_graphql_1 = require("type-graphql");
const material_entity_1 = require("../entities/material.entity");
const material_service_1 = __importDefault(require("../services/material.service"));
const material_entity_2 = __importDefault(require("./../entities/material.entity"));
const category_service_1 = __importDefault(require("../services/category.service"));
let MaterialResolver = class MaterialResolver {
    async listMaterials() {
        const materials = await new material_service_1.default().listMaterials();
        return materials;
    }
    async findMaterialById(id) {
        const materials = await new material_service_1.default().findMaterialById(id);
        return materials;
    }
    async findMaterialByCategories(id) {
        const category = await new category_service_1.default().find(id);
        if (!category) {
            throw new Error("La catégorie n'existe pas");
        }
        const material = await new material_service_1.default().listByCategory(id);
        return material;
    }
    async createMaterial(data) {
        const newMaterial = await new material_service_1.default().createMaterial(data);
        return newMaterial;
    }
    async deleteMaterial(id) {
        const deletedMaterial = await new material_service_1.default().deleteMaterial(id);
        return deletedMaterial;
    }
    async updateMaterial(data) {
        const { id, ...otherData } = data;
        const materialToUpdate = await new material_service_1.default().updateMaterial(id, otherData);
        return materialToUpdate;
    }
};
__decorate([
    (0, type_graphql_1.Query)(() => [material_entity_2.default]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MaterialResolver.prototype, "listMaterials", null);
__decorate([
    (0, type_graphql_1.Query)(() => material_entity_2.default),
    __param(0, (0, type_graphql_1.Arg)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MaterialResolver.prototype, "findMaterialById", null);
__decorate([
    (0, type_graphql_1.Query)(() => [material_entity_2.default]),
    __param(0, (0, type_graphql_1.Arg)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MaterialResolver.prototype, "findMaterialByCategories", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => material_entity_2.default),
    __param(0, (0, type_graphql_1.Arg)('data')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [material_entity_1.CreateMaterialInput]),
    __metadata("design:returntype", Promise)
], MaterialResolver.prototype, "createMaterial", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => material_entity_2.default),
    __param(0, (0, type_graphql_1.Arg)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MaterialResolver.prototype, "deleteMaterial", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => material_entity_2.default),
    __param(0, (0, type_graphql_1.Arg)('data')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [material_entity_1.UpdateMaterialInput]),
    __metadata("design:returntype", Promise)
], MaterialResolver.prototype, "updateMaterial", null);
MaterialResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], MaterialResolver);
exports.default = MaterialResolver;
