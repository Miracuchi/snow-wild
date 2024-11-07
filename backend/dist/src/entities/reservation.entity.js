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
exports.AdminGetReservations = exports.AdminDeletedReservation = exports.UpdateReservationInput = exports.CreateReservationInput = exports.PartialUserInput = exports.ReservationMaterialInput = exports.ReservationDeleted = void 0;
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const types_1 = require("../types");
const reservation_material_entity_1 = __importDefault(require("./reservation_material.entity"));
const user_entity_1 = __importDefault(require("./user.entity"));
// =================================================================
//                           OBJECT TYPE
// =================================================================
let Reservation = class Reservation {
};
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Reservation.prototype, "id", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => user_entity_1.default),
    (0, typeorm_1.JoinColumn)(),
    (0, typeorm_1.ManyToOne)(() => user_entity_1.default, (u) => u.reservations, {
        cascade: true,
        onDelete: 'CASCADE',
    }),
    __metadata("design:type", user_entity_1.default)
], Reservation.prototype, "user", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], Reservation.prototype, "start_date", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], Reservation.prototype, "end_date", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typeorm_1.CreateDateColumn)({
        type: 'date',
    }),
    __metadata("design:type", Date)
], Reservation.prototype, "createdAt", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: types_1.StatutReservation,
        default: types_1.StatutReservation.AWAITING,
    }),
    __metadata("design:type", String)
], Reservation.prototype, "status", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [reservation_material_entity_1.default]),
    (0, typeorm_1.JoinColumn)(),
    (0, typeorm_1.OneToMany)(() => reservation_material_entity_1.default, (r) => r.reservation),
    __metadata("design:type", Array)
], Reservation.prototype, "reservationMaterials", void 0);
Reservation = __decorate([
    (0, typeorm_1.Entity)({ name: 'Reservation' }),
    (0, type_graphql_1.ObjectType)()
], Reservation);
exports.default = Reservation;
// Quand on fait un ObjectType à supprimer, ne pas mettre d'id. Il sera supprimé, donc pas de retour.
let ReservationDeleted = class ReservationDeleted {
};
exports.ReservationDeleted = ReservationDeleted;
__decorate([
    (0, type_graphql_1.Field)(() => user_entity_1.default),
    __metadata("design:type", user_entity_1.default)
], ReservationDeleted.prototype, "user", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [reservation_material_entity_1.default]),
    __metadata("design:type", Array)
], ReservationDeleted.prototype, "reservationMaterials", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], ReservationDeleted.prototype, "status", void 0);
exports.ReservationDeleted = ReservationDeleted = __decorate([
    (0, type_graphql_1.ObjectType)()
], ReservationDeleted);
// =================================================================
//                           INPUT TYPE
// =================================================================
let ReservationMaterialInput = class ReservationMaterialInput {
};
exports.ReservationMaterialInput = ReservationMaterialInput;
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Number)
], ReservationMaterialInput.prototype, "quantity", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], ReservationMaterialInput.prototype, "materialId", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], ReservationMaterialInput.prototype, "size", void 0);
exports.ReservationMaterialInput = ReservationMaterialInput = __decorate([
    (0, type_graphql_1.InputType)()
], ReservationMaterialInput);
let PartialUserInput = class PartialUserInput {
};
exports.PartialUserInput = PartialUserInput;
__decorate([
    (0, type_graphql_1.Field)(() => type_graphql_1.ID),
    __metadata("design:type", String)
], PartialUserInput.prototype, "id", void 0);
exports.PartialUserInput = PartialUserInput = __decorate([
    (0, type_graphql_1.InputType)()
], PartialUserInput);
let CreateReservationInput = class CreateReservationInput {
};
exports.CreateReservationInput = CreateReservationInput;
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", PartialUserInput // Identifiant de l'utilisateur qui effectue la réservation
    )
], CreateReservationInput.prototype, "user", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [ReservationMaterialInput]),
    __metadata("design:type", Array)
], CreateReservationInput.prototype, "materials", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Date)
], CreateReservationInput.prototype, "start_date", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Date)
], CreateReservationInput.prototype, "end_date", void 0);
exports.CreateReservationInput = CreateReservationInput = __decorate([
    (0, type_graphql_1.InputType)()
], CreateReservationInput);
let UpdateReservationInput = class UpdateReservationInput {
};
exports.UpdateReservationInput = UpdateReservationInput;
__decorate([
    (0, type_graphql_1.Field)(() => type_graphql_1.ID),
    __metadata("design:type", String)
], UpdateReservationInput.prototype, "id", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Date)
], UpdateReservationInput.prototype, "start_date", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Date)
], UpdateReservationInput.prototype, "end_date", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], UpdateReservationInput.prototype, "status", void 0);
exports.UpdateReservationInput = UpdateReservationInput = __decorate([
    (0, type_graphql_1.InputType)()
], UpdateReservationInput);
let AdminDeletedReservation = class AdminDeletedReservation {
};
exports.AdminDeletedReservation = AdminDeletedReservation;
__decorate([
    (0, type_graphql_1.Field)(() => user_entity_1.default),
    __metadata("design:type", user_entity_1.default)
], AdminDeletedReservation.prototype, "user", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [reservation_material_entity_1.default]),
    __metadata("design:type", Array)
], AdminDeletedReservation.prototype, "reservationMaterials", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], AdminDeletedReservation.prototype, "status", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Date)
], AdminDeletedReservation.prototype, "start_date", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Date)
], AdminDeletedReservation.prototype, "end_date", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Date)
], AdminDeletedReservation.prototype, "createdAt", void 0);
exports.AdminDeletedReservation = AdminDeletedReservation = __decorate([
    (0, type_graphql_1.ObjectType)()
], AdminDeletedReservation);
let AdminGetReservations = class AdminGetReservations {
};
exports.AdminGetReservations = AdminGetReservations;
__decorate([
    (0, type_graphql_1.Field)(() => user_entity_1.default),
    __metadata("design:type", user_entity_1.default)
], AdminGetReservations.prototype, "user", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => [reservation_material_entity_1.default]),
    __metadata("design:type", Array)
], AdminGetReservations.prototype, "reservationMaterials", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], AdminGetReservations.prototype, "status", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Date)
], AdminGetReservations.prototype, "start_date", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Date)
], AdminGetReservations.prototype, "end_date", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Date)
], AdminGetReservations.prototype, "createdAt", void 0);
exports.AdminGetReservations = AdminGetReservations = __decorate([
    (0, type_graphql_1.ObjectType)()
], AdminGetReservations);
