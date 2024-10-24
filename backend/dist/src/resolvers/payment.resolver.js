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
exports.ProductForSessionInput = void 0;
const graphql_scalars_1 = require("graphql-scalars");
const type_graphql_1 = require("type-graphql");
const payment_service_1 = __importDefault(require("../services/payment.service"));
let ProductForSessionInput = class ProductForSessionInput {
};
exports.ProductForSessionInput = ProductForSessionInput;
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], ProductForSessionInput.prototype, "id", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => type_graphql_1.Int),
    __metadata("design:type", Number)
], ProductForSessionInput.prototype, "quantity", void 0);
exports.ProductForSessionInput = ProductForSessionInput = __decorate([
    (0, type_graphql_1.InputType)()
], ProductForSessionInput);
let PaymentResolver = class PaymentResolver {
    async createSession(data, reservationId) {
        console.log('DATA', data);
        return await new payment_service_1.default().createSession(data, reservationId);
    }
};
__decorate([
    (0, type_graphql_1.Query)(() => graphql_scalars_1.GraphQLJSON),
    __param(0, (0, type_graphql_1.Arg)('data', () => [ProductForSessionInput])),
    __param(1, (0, type_graphql_1.Arg)('reservationId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array, String]),
    __metadata("design:returntype", Promise)
], PaymentResolver.prototype, "createSession", null);
PaymentResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], PaymentResolver);
exports.default = PaymentResolver;
