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
const reservation_material_service_1 = __importDefault(require("../services/reservation_material.service"));
const reservation_material_entity_1 = require("./../entities/reservation_material.entity");
let ReservationMaterialResolver = class ReservationMaterialResolver {
    async reservations() {
        return await new reservation_material_service_1.default().listReservationsMaterial();
    }
    async reservationMaterialBetweenDates(data) {
        return await new reservation_material_service_1.default().findAllReservationMaterialBetweenUserDate(data);
    }
    // Update reservationMaterial data : quantity or material
    async updateReservationMaterial(data) {
        const { id, ...otherData } = data;
        const reservationMaterialToUpdate = await new reservation_material_service_1.default().updateResMat(id, otherData);
        if (!reservationMaterialToUpdate) {
            throw new Error("La reservationMat n'existe point");
        }
        return reservationMaterialToUpdate;
    }
};
__decorate([
    (0, type_graphql_1.Query)(() => [reservation_material_entity_1.ReservationMaterial]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ReservationMaterialResolver.prototype, "reservations", null);
__decorate([
    (0, type_graphql_1.Query)(() => [reservation_material_entity_1.ReservationMaterial]),
    __param(0, (0, type_graphql_1.Arg)('data')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [reservation_material_entity_1.FindReservationMaterialsBetweenTwoDateInput]),
    __metadata("design:returntype", Promise)
], ReservationMaterialResolver.prototype, "reservationMaterialBetweenDates", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => reservation_material_entity_1.ReservationMaterial),
    __param(0, (0, type_graphql_1.Arg)('data')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [reservation_material_entity_1.UpdateReservationMaterialInput]),
    __metadata("design:returntype", Promise)
], ReservationMaterialResolver.prototype, "updateReservationMaterial", null);
ReservationMaterialResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], ReservationMaterialResolver);
exports.default = ReservationMaterialResolver;
