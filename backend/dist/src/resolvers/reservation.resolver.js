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
/* eslint-disable @typescript-eslint/no-unused-vars */
const type_graphql_1 = require("type-graphql");
const graphql_scalars_1 = require("graphql-scalars");
const reservation_entity_1 = __importStar(require("../entities/reservation.entity"));
const reservation_service_1 = __importDefault(require("../services/reservation.service"));
const reservation_material_service_1 = __importDefault(require("../services/reservation_material.service"));
let ReservationResolver = class ReservationResolver {
    async reservations() {
        return await new reservation_service_1.default().listReservations();
    }
    // Get One Reaservation by ID
    async reservationById(id) {
        const reservation = await new reservation_service_1.default().findReservationById(id);
        return reservation;
    }
    // Get All Reservation by ID user
    async reservationsByUserId(id) {
        const reservation = await new reservation_service_1.default().findReservationsByUserId(id);
        return reservation;
    }
    // Get All reservation(s) by date
    async reservationsByDate(date) {
        const reservation = await new reservation_service_1.default().findReservationsByDate(date);
        return reservation;
    }
    // Create Mutaion add one reservation
    async createReservation(data) {
        const newReservation = await new reservation_service_1.default().createReservation(data);
        const materialsPromises = data.materials.map((material) => {
            const dataToResMat = {
                reservation: newReservation, //  {id: ...}
                quantity: material.quantity,
                material: { id: material.materialId },
                size: material.size,
            };
            return new reservation_material_service_1.default().createResMat(dataToResMat);
        });
        const reservationMaterials = (await Promise.all(materialsPromises));
        newReservation.reservationMaterials = reservationMaterials;
        return newReservation;
    }
    // Update Reservation start_date or end_date
    async updateReservation(data) {
        const { id, ...otherData } = data;
        const reservationToUpdate = await new reservation_service_1.default().updateReservation(id, otherData);
        if (!reservationToUpdate) {
            throw new Error("La reservation n'existe pas");
        }
        return reservationToUpdate;
    }
    // Delete ReservationById
    async deleteReservation(id) {
        const { id: idReservation, ...reservation } = await new reservation_service_1.default().deleteReservation(id);
        return { ...reservation };
    }
    async adminDeleteReservation(id) {
        const { id: idReservation, ...reservation } = await new reservation_service_1.default().deleteReservation(id);
        return { ...reservation };
    }
    async adminGetReservations() {
        return await new reservation_service_1.default().listReservations();
    }
};
__decorate([
    (0, type_graphql_1.Query)(() => [reservation_entity_1.default]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ReservationResolver.prototype, "reservations", null);
__decorate([
    (0, type_graphql_1.Query)(() => reservation_entity_1.default),
    __param(0, (0, type_graphql_1.Arg)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ReservationResolver.prototype, "reservationById", null);
__decorate([
    (0, type_graphql_1.Query)(() => [reservation_entity_1.default]),
    __param(0, (0, type_graphql_1.Arg)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ReservationResolver.prototype, "reservationsByUserId", null);
__decorate([
    (0, type_graphql_1.Query)(() => [reservation_entity_1.default]),
    __param(0, (0, type_graphql_1.Arg)('date', () => graphql_scalars_1.GraphQLDate)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Date]),
    __metadata("design:returntype", Promise)
], ReservationResolver.prototype, "reservationsByDate", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => reservation_entity_1.default) //prévoir un object type de retour
    ,
    __param(0, (0, type_graphql_1.Arg)('data')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [reservation_entity_1.CreateReservationInput]),
    __metadata("design:returntype", Promise)
], ReservationResolver.prototype, "createReservation", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => reservation_entity_1.default),
    __param(0, (0, type_graphql_1.Arg)('data')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [reservation_entity_1.UpdateReservationInput]),
    __metadata("design:returntype", Promise)
], ReservationResolver.prototype, "updateReservation", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => reservation_entity_1.ReservationDeleted),
    __param(0, (0, type_graphql_1.Arg)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ReservationResolver.prototype, "deleteReservation", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => reservation_entity_1.AdminDeletedReservation),
    __param(0, (0, type_graphql_1.Arg)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ReservationResolver.prototype, "adminDeleteReservation", null);
__decorate([
    (0, type_graphql_1.Query)(() => [reservation_entity_1.default]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ReservationResolver.prototype, "adminGetReservations", null);
ReservationResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], ReservationResolver);
exports.default = ReservationResolver;
