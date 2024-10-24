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
exports.FindReservationMaterialsBetweenTwoDateInput = exports.UpdateReservationMaterialInput = exports.CreateReservationMaterialInput = exports.ReservationMaterial = void 0;
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const material_entity_1 = __importDefault(require("./material.entity"));
const reservation_entity_1 = __importDefault(require("./reservation.entity"));
// =================================================================
//                           OBJECT TYPE
// =================================================================
let ReservationMaterial = class ReservationMaterial {
};
exports.ReservationMaterial = ReservationMaterial;
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], ReservationMaterial.prototype, "id", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], ReservationMaterial.prototype, "quantity", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => reservation_entity_1.default),
    (0, typeorm_1.JoinColumn)(),
    (0, typeorm_1.ManyToOne)(() => reservation_entity_1.default, (reservation) => reservation.id, {
        cascade: true,
        onDelete: 'CASCADE',
    }),
    __metadata("design:type", reservation_entity_1.default)
], ReservationMaterial.prototype, "reservation", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => material_entity_1.default),
    (0, typeorm_1.JoinColumn)(),
    (0, typeorm_1.ManyToOne)(() => material_entity_1.default, (material) => material.id, {
        cascade: true,
        onDelete: 'CASCADE',
    }),
    __metadata("design:type", material_entity_1.default)
], ReservationMaterial.prototype, "material", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => type_graphql_1.Float),
    (0, typeorm_1.Column)({ type: 'float' }),
    __metadata("design:type", Number)
], ReservationMaterial.prototype, "price", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ReservationMaterial.prototype, "size", void 0);
exports.ReservationMaterial = ReservationMaterial = __decorate([
    (0, type_graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)()
], ReservationMaterial);
// =================================================================
//                           INPUT TYPE
// =================================================================
let CreateReservationMaterialInput = class CreateReservationMaterialInput {
};
exports.CreateReservationMaterialInput = CreateReservationMaterialInput;
__decorate([
    (0, type_graphql_1.Field)(() => reservation_entity_1.default),
    __metadata("design:type", reservation_entity_1.default // Identifiant de la réservation
    )
], CreateReservationMaterialInput.prototype, "reservation", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => material_entity_1.default),
    __metadata("design:type", material_entity_1.default // Identifiant du matériau
    )
], CreateReservationMaterialInput.prototype, "material", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Number)
], CreateReservationMaterialInput.prototype, "quantity", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], CreateReservationMaterialInput.prototype, "size", void 0);
exports.CreateReservationMaterialInput = CreateReservationMaterialInput = __decorate([
    (0, type_graphql_1.InputType)()
], CreateReservationMaterialInput);
let UpdateReservationMaterialInput = class UpdateReservationMaterialInput {
};
exports.UpdateReservationMaterialInput = UpdateReservationMaterialInput;
__decorate([
    (0, type_graphql_1.Field)(() => type_graphql_1.ID),
    __metadata("design:type", String)
], UpdateReservationMaterialInput.prototype, "id", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], UpdateReservationMaterialInput.prototype, "materialId", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Number)
], UpdateReservationMaterialInput.prototype, "quantity", void 0);
exports.UpdateReservationMaterialInput = UpdateReservationMaterialInput = __decorate([
    (0, type_graphql_1.InputType)()
], UpdateReservationMaterialInput);
let FindReservationMaterialsBetweenTwoDateInput = class FindReservationMaterialsBetweenTwoDateInput {
};
exports.FindReservationMaterialsBetweenTwoDateInput = FindReservationMaterialsBetweenTwoDateInput;
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], FindReservationMaterialsBetweenTwoDateInput.prototype, "materialId", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Date)
], FindReservationMaterialsBetweenTwoDateInput.prototype, "from_date", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Date)
], FindReservationMaterialsBetweenTwoDateInput.prototype, "to_date", void 0);
exports.FindReservationMaterialsBetweenTwoDateInput = FindReservationMaterialsBetweenTwoDateInput = __decorate([
    (0, type_graphql_1.InputType)()
], FindReservationMaterialsBetweenTwoDateInput);
