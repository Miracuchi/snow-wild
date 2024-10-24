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
const db_1 = __importDefault(require("../db"));
const category_entity_1 = __importStar(require("../entities/category.entity"));
const type_graphql_1 = require("type-graphql");
class CategoryService {
    constructor() {
        this.db = db_1.default.getRepository(category_entity_1.default);
    }
    async findCategory(id) {
        const category = await this.db.findOne({
            where: { id },
            relations: { material: true }
        });
        if (!category) {
            throw new Error("Cette catégorie n'existe pas");
        }
        return category;
    }
    async listCategories() {
        return this.db.find();
    }
    async createCategory({ name }) {
        const newCategory = this.db.create({ name });
        return await this.db.save(newCategory);
    }
    async deleteCategory(id) {
        const category = (await this.findCategory(id));
        await this.db.remove(category);
        return { ...category, id };
    }
    async find(id) {
        const category = await this.db.findOne({
            where: { id },
            relations: { material: true },
        });
        if (!category) {
            throw new Error("La catégorie n'existe pas!");
        }
        return category;
    }
    async findCategoryByName(name) {
        const category = await this.db.findOne({
            where: { name },
            relations: { material: true },
        });
        return category;
    }
    async updateCategory(data) {
        const { id } = data;
        const categoryToUpdate = await this.find(id);
        if (!categoryToUpdate) {
            throw new Error("Error, category id not found!");
        }
        const categoryToSave = this.db.merge(categoryToUpdate, {
            ...data,
        });
        return await this.db.save(categoryToSave);
    }
}
exports.default = CategoryService;
__decorate([
    __param(0, (0, type_graphql_1.Arg)('data')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [category_entity_1.AdminUpdateCategoryInput]),
    __metadata("design:returntype", Promise)
], CategoryService.prototype, "updateCategory", null);
