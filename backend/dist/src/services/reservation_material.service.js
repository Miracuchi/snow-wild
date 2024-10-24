"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const db_1 = __importDefault(require("../db"));
const reservation_material_entity_1 = __importDefault(require("../entities/reservation_material.entity"));
const material_service_1 = __importDefault(require("./material.service"));
const reservation_service_1 = __importDefault(require("./reservation.service"));
class ReservationMaterialService {
    constructor() {
        this.db = db_1.default.getRepository(reservation_material_entity_1.default);
    }
    async listReservationsMaterial() {
        return this.db.find();
    }
    async find(id) {
        const reservationMaterial = await this.db.findOne({
            where: { id },
            relations: { reservation: true },
        });
        return reservationMaterial;
    }
    async findAllReservationMaterialBetweenUserDate(data) {
        const { materialId, from_date, to_date } = data;
        const materialData = await new material_service_1.default().findMaterialById(materialId);
        if (!materialData) {
            throw new Error('Materiel inconnu');
        }
        const reservationMaterials = await this.db.find({
            where: {
                material: { id: materialId },
                reservation: {
                    start_date: (0, typeorm_1.LessThanOrEqual)(to_date),
                    end_date: (0, typeorm_1.MoreThanOrEqual)(from_date),
                },
            },
            relations: ['reservation'],
        });
        return reservationMaterials;
    }
    async findReservationMaterial(id) {
        const reservationMaterial = await this.db.findOne({
            where: { id },
            relations: { material: true, reservation: true },
        });
        if (!reservationMaterial) {
            throw new Error("Le reservation material n'existe pas!!!!!!!!!");
        }
        return reservationMaterial;
    }
    async createResMat(data) {
        const { material, quantity, size } = data;
        const materialData = await new material_service_1.default().findMaterialById(material.id);
        if (!materialData) {
            throw new Error('Matériel non disponible');
        }
        const sizeData = materialData.sizes.find((s) => s.size === size);
        console.log(sizeData);
        if (!sizeData) {
            await new reservation_service_1.default().deleteReservation(data.reservation.id);
            throw new Error('Taille non disponible');
        }
        if (sizeData.quantity < data.quantity) {
            throw new Error('Matériel non disponible en quantité suffisante.');
        }
        // TODO: diminuer ou augmenter le nombre de matériel en base en fonction des départs et des retours
        // const newQuantity = materialData.quantity - data.quantity;
        // await new MaterialService().updateMaterial(materialData.id, {
        //   quantity: newQuantity,
        // });
        const final_price = materialData.price * quantity;
        const newReservationMaterial = this.db.create({
            ...data,
            price: final_price,
            size: data.size,
        });
        const reservationmaterial = await this.db.save(newReservationMaterial);
        return await this.findReservationMaterial(reservationmaterial.id);
    }
    async updateResMat(id, data) {
        const reservatioMaterialToUpdate = await this.findReservationMaterial(id);
        const { materialId, quantity } = data;
        if (!materialId)
            return null;
        const materialData = await new material_service_1.default().findMaterialById(materialId);
        if (!materialData || !quantity)
            return null;
        const newPrice = materialData && quantity && materialData?.price * quantity;
        if (!reservatioMaterialToUpdate) {
            throw new Error("La réservationMat n'existe pas !");
        }
        const reservationMaterialToSave = this.db.merge(reservatioMaterialToUpdate, { ...data, price: newPrice });
        const reservationmaterial = await this.db.save(reservationMaterialToSave);
        return await this.findReservationMaterial(reservationmaterial.id);
    }
    async deleteReservationMaterial(id) {
        const reservationMaterialToDelete = (await this.find(id));
        await this.db.remove(reservationMaterialToDelete);
        return { ...reservationMaterialToDelete };
    }
}
exports.default = ReservationMaterialService;
