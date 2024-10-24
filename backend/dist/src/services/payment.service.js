"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("../db"));
const material_entity_1 = __importDefault(require("../entities/material.entity"));
const index_1 = require("../index");
console.log(index_1.app);
class PaymentService {
    constructor() {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        this.stripe = require('stripe')(process.env.STRIPE_PRIVATE_API_KEY);
    }
    async calculateTotalAmount(data) {
        const productRepository = db_1.default.getRepository(material_entity_1.default);
        const totalAmount = await data.reduce(async (prevPromise, curr) => {
            const prev = await prevPromise;
            const itemInMemory = await productRepository.findOneBy({ id: curr.id }); // Récupérer le produit depuis la base de données
            console.log('%c⧭', 'color: #006dcc', itemInMemory);
            if (!itemInMemory) {
                throw new Error("Ce produit n'existe pas");
            }
            const prix_hors_taxe = itemInMemory.price;
            const taxes = prix_hors_taxe * 0.2 * curr.quantity;
            const prixTTC = prix_hors_taxe * curr.quantity + taxes;
            return prev + prixTTC;
        }, Promise.resolve(0));
        return parseFloat(totalAmount.toFixed(2));
    }
    async createSession(data, reservationId) {
        const totalAmount = (await this.calculateTotalAmount(data)) * 100;
        const session = await this.stripe.paymentIntents.create({
            amount: totalAmount,
            currency: 'eur',
            metadata: { reservationId: reservationId },
        });
        return session;
    }
}
exports.default = PaymentService;
