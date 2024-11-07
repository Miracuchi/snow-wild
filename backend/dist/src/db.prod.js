"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const typeorm_1 = require("typeorm");
const category_entity_1 = __importDefault(require("./entities/category.entity"));
const material_entity_1 = __importDefault(require("./entities/material.entity"));
const reservation_entity_1 = __importDefault(require("./entities/reservation.entity"));
const reservation_material_entity_1 = __importDefault(require("./entities/reservation_material.entity"));
const user_entity_1 = __importDefault(require("./entities/user.entity"));
dotenv_1.default.config();
exports.default = new typeorm_1.DataSource({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: 5432, // Assure-toi de convertir en nombre
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: true, //en dev, en prod on préfera utiliser les migrations
    logging: true,
    entities: [category_entity_1.default, material_entity_1.default, reservation_material_entity_1.default, user_entity_1.default, reservation_entity_1.default],
});
// Category, Material, ReservationMaterial, User, Reservation
//__dirname + '../dist/src/entities/*.entity.{js,ts}'
// 'dist/src/entities/*.entity.{js,ts}'
// 'dist/**/*.entity.js'
// 'dist/**/category.entity.js',
//     'dist/**/material.entity.js',
//     'dist/**/user.entity.js',
//     'dist/**/reservation_material.entity.js',
//     'dist/**/reservation.entity.js',
