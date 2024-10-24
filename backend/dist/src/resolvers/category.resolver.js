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
const category_entity_1 = __importStar(require("./../entities/category.entity"));
const type_graphql_1 = require("type-graphql");
const category_service_1 = __importDefault(require("../services/category.service"));
const category_entity_2 = require("../entities/category.entity");
let CategoryResolver = class CategoryResolver {
    async categories() {
        return await new category_service_1.default().listCategories();
    }
    async findCategory(id) {
        return await new category_service_1.default().findCategory(id);
    }
    async createCategory(data) {
        const findedCategory = await new category_service_1.default().findCategoryByName(data.name);
        console.log("findedCategory: ", findedCategory);
        if (findedCategory) {
            throw new Error("This name alredy used");
            // return findedCategory
        }
        const newCategory = await new category_service_1.default().createCategory({
            ...data,
        });
        return newCategory;
    }
    async updateCategory(data) {
        const { id } = data;
        const findedCategory = await new category_service_1.default().find(id);
        console.log("findedCategory: ", findedCategory);
        // if(!findedCategory) {
        //   throw new Error("Error, This category id doesn't exist !")
        // }
        const updatedCategory = await new category_service_1.default().updateCategory(data);
        return updatedCategory;
    }
    //   @Authorized(["admin"])
    async deleteCategory(id) {
        const categoryDeleted = await new category_service_1.default().deleteCategory(id);
        return categoryDeleted;
    }
};
__decorate([
    (0, type_graphql_1.Query)(() => [category_entity_1.default]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CategoryResolver.prototype, "categories", null);
__decorate([
    (0, type_graphql_1.Query)(() => category_entity_1.default),
    __param(0, (0, type_graphql_1.Arg)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CategoryResolver.prototype, "findCategory", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => category_entity_1.default),
    __param(0, (0, type_graphql_1.Arg)('data')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [category_entity_2.CreateCategoryInput]),
    __metadata("design:returntype", Promise)
], CategoryResolver.prototype, "createCategory", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => category_entity_1.default),
    __param(0, (0, type_graphql_1.Arg)('data')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [category_entity_1.AdminUpdateCategoryInput]),
    __metadata("design:returntype", Promise)
], CategoryResolver.prototype, "updateCategory", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => category_entity_1.default),
    __param(0, (0, type_graphql_1.Arg)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CategoryResolver.prototype, "deleteCategory", null);
CategoryResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], CategoryResolver);
exports.default = CategoryResolver;
