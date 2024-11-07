"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("../db"));
const reservation_entity_1 = __importDefault(require("../entities/reservation.entity"));
const types_1 = require("../types");
class ReservationService {
    constructor() {
        this.db = db_1.default.getRepository(reservation_entity_1.default);
    }
    async listReservations() {
        return this.db.find({
            relations: {
                user: true,
                reservationMaterials: {
                    material: true,
                },
            },
        });
    }
    async findReservationById(id) {
        const reservation = await this.db.findOne({
            where: { id },
            relations: { reservationMaterials: true },
        });
        return reservation;
    }
    async findReservationsByUserId(id) {
        const reservationByUserId = await this.db.find({
            where: { user: { id } },
            relations: [
                'user',
                'reservationMaterials',
                'reservationMaterials.material',
            ],
        });
        return reservationByUserId;
    }
    async findReservationsByDate(date) {
        const reservationsByDate = await this.db.find({
            where: {
                createdAt: date,
            },
        });
        return reservationsByDate;
    }
    async createReservation(data) {
        const { ...otherData } = data;
        const createdAt = new Date();
        const dataIntermediaire = {
            ...otherData,
            createdAt,
            statut: types_1.StatutReservation.AWAITING,
        };
        const newReservation = this.db.create({ ...dataIntermediaire });
        const creatResa = await this.db.save(newReservation);
        return creatResa;
    }
    async updateReservation(id, data) {
        const reservationToUpdate = await this.findReservationById(id);
        if (!reservationToUpdate) {
            throw new Error("La réservation n'existe pas !");
        }
        const { start_date, end_date, status } = data;
        const reservationToSave = this.db.merge(reservationToUpdate, {
            start_date,
            end_date,
            status,
        });
        await this.db.save(reservationToSave);
        return await this.findReservationById(reservationToSave.id);
    }
    async deleteReservation(id) {
        const reservationToDelete = (await this.findReservationById(id));
        await this.db.remove(reservationToDelete);
        return { ...reservationToDelete, id };
    }
}
exports.default = ReservationService;
