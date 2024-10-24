"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const class_validator_1 = require("class-validator");
const db_1 = __importDefault(require("../db"));
const material_entity_1 = __importDefault(require("../entities/material.entity"));
const category_service_1 = __importDefault(require("./category.service"));
class MaterialService {
    constructor() {
        this.db = db_1.default.getRepository(material_entity_1.default);
    }
    async listMaterials() {
        return this.db.find({
            relations: { category: true }
        });
    }
    async findMaterialById(id) {
        const material = await this.db.findOne({
            where: { id },
            relations: { category: true },
        });
        if (!material) {
            throw new Error("Ce matériel n'existe pas");
        }
        return material;
    }
    async listByCategory(id) {
        return await this.db.find({
            where: { category: { id } },
            relations: { category: true }
        });
    }
    async createMaterial(data) {
        const categoryToLink = await new category_service_1.default().find(data?.category?.id);
        if (!categoryToLink) {
            throw new Error("La catégorie n'existe pas!");
        }
        const newMaterial = this.db.create({
            ...data,
            category: categoryToLink,
        });
        const errors = await (0, class_validator_1.validate)(newMaterial);
        console.log('ERRORS => ', errors);
        return await this.db.save(newMaterial);
    }
    async deleteMaterial(id) {
        const material = (await this.findMaterialById(id));
        const deletedMaterial = await this.db.remove(material);
        return { ...deletedMaterial, id };
    }
    async updateMaterial(id, data) {
        if (!data.category)
            return null;
        const categoryToLink = await new category_service_1.default().find(data?.category.id);
        const materialToUpdate = await this.findMaterialById(id);
        if (!materialToUpdate) {
            throw new Error("Error, material id not found!");
        }
        const materialToSave = this.db.merge(materialToUpdate, {
            ...data,
            category: categoryToLink,
        });
        const errors = await (0, class_validator_1.validate)(materialToSave);
        if (errors.length !== 0) {
            console.log(errors);
            throw new Error('il y a eu une erreur');
        }
        return await this.db.save(materialToSave);
    }
}
exports.default = MaterialService;
