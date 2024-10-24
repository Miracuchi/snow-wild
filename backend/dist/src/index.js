"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
/* eslint-disable no-case-declarations */
/* eslint-disable @typescript-eslint/no-var-requires */
const server_1 = require("@apollo/server");
const express4_1 = require("@apollo/server/express4");
const drainHttpServer_1 = require("@apollo/server/plugin/drainHttpServer");
const cookies_1 = __importDefault(require("cookies"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const jose_1 = require("jose");
require("reflect-metadata");
const type_graphql_1 = require("type-graphql");
const db_prod_1 = __importDefault(require("./db.prod"));
const authChecker_1 = require("./lib/authChecker");
const category_resolver_1 = __importDefault(require("./resolvers/category.resolver"));
const material_resolver_1 = __importDefault(require("./resolvers/material.resolver"));
const payment_resolver_1 = __importDefault(require("./resolvers/payment.resolver"));
const reservation_resolver_1 = __importDefault(require("./resolvers/reservation.resolver"));
const reservation_material_resolver_1 = __importDefault(require("./resolvers/reservation_material.resolver"));
const user_resolver_1 = __importDefault(require("./resolvers/user.resolver"));
const reservation_service_1 = __importDefault(require("./services/reservation.service"));
const user_service_1 = __importDefault(require("./services/user.service"));
const types_1 = require("./types");
exports.app = (0, express_1.default)();
dotenv_1.default.config();
const httpServer = http_1.default.createServer(exports.app);
const PORT = Number(process.env.PORT) || 4000;
console.log('hello');
const stripe = require('stripe')(process.env.STRIPE_PRIVATE_API_KEY);
async function main() {
    const schema = await (0, type_graphql_1.buildSchema)({
        resolvers: [
            category_resolver_1.default,
            material_resolver_1.default,
            user_resolver_1.default,
            reservation_resolver_1.default,
            reservation_material_resolver_1.default,
            payment_resolver_1.default,
        ],
        validate: false,
        authChecker: authChecker_1.customAuthChecker,
    });
    const server = new server_1.ApolloServer({
        schema,
        plugins: [(0, drainHttpServer_1.ApolloServerPluginDrainHttpServer)({ httpServer })],
    });
    await server.start();
    exports.app.post('/webhooks', express_1.default.raw({ type: 'application/json' }), // Utiliser express.raw pour les webhooks Stripe
    (request, response) => {
        const sig = request.headers['stripe-signature'];
        const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET; // Secret de webhook Stripe
        let event;
        try {
            // Vérification de la signature du webhook
            event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
        }
        catch (err) {
            console.error(`⚠️  Erreur de signature du webhook`, err);
            return response.sendStatus(400);
        }
        // Gestion des événements Stripe
        switch (event.type) {
            case 'payment_intent.succeeded':
                const paymentIntent = event.data.object;
                const id = paymentIntent.metadata.reservationId;
                new reservation_service_1.default().updateReservation(id, {
                    status: types_1.StatutReservation.PAID,
                });
                console.log('Paiement réussi pour:', paymentIntent.id);
                // Vous pouvez mettre à jour votre base de données ici
                break;
            case 'payment_method.attached':
                const paymentMethod = event.data.object;
                console.log('Méthode de paiement attachée:', paymentMethod.id);
                break;
            default:
                console.log(`Unhandled event type ${event.type}`);
        }
        response.json({ received: true });
    });
    exports.app.use('/', (0, cors_1.default)({
        origin: [
            'http://localhost:3000',
            'http://localhost:8000',
            'https://snow-wild.vercel.app/',
        ],
        credentials: true,
    }), express_1.default.json(), 
    // TODO: find how to handle http request + graphql request
    // This line intercept all request and need a token, we should add an exception for our /webhooks route
    (0, express4_1.expressMiddleware)(server, {
        context: async ({ req, res }) => {
            let user = null;
            const cookies = new cookies_1.default(req, res);
            const token = cookies.get('token');
            if (token) {
                try {
                    const verify = await (0, jose_1.jwtVerify)(token, new TextEncoder().encode(process.env.JWT_SECRET_KEY));
                    user = await new user_service_1.default().findUserByEmail(verify.payload.email);
                    console.log(user);
                }
                catch (err) {
                    console.log(err);
                }
            }
            return { req, res, user };
        },
    }));
    await db_prod_1.default.initialize();
    console.log();
    // await new Promise<void>((resolve) =>
    //   httpServer.listen({ port: PORT }, resolve)
    // )
    exports.app.listen(PORT, () => {
        console.log(`Example app listening on port ${PORT}`);
    });
    console.log(`🚀 Server lancé sur http://localhost:4000/`);
}
main();
