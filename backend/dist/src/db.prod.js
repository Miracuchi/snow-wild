"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
exports.default = new typeorm_1.DataSource({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: 5432, // Assure-toi de convertir en nombre
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: true, //en dev, en prod on préfera utiliser les migrations
    logging: true,
    entities: ['dist/entities/*.js'],
});
