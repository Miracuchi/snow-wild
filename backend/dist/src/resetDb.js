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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const argon2 = __importStar(require("argon2"));
const db_1 = __importDefault(require("./db"));
const category_entity_1 = __importDefault(require("./entities/category.entity"));
const material_entity_1 = __importDefault(require("./entities/material.entity"));
const user_entity_1 = __importDefault(require("./entities/user.entity"));
const types_1 = require("./types");
async function cleadDb() {
    const runner = db_1.default.createQueryRunner();
    await runner.query(`DROP TABLE IF EXISTS book`);
    await runner.query(`DROP TABLE IF EXISTS reservation_material`);
    await runner.query(`DROP TABLE IF EXISTS reservation`);
    await runner.query(`DROP TABLE IF EXISTS material`);
    await runner.query(`DROP TABLE IF EXISTS category`);
    await runner.query(`DROP TABLE IF EXISTS "user"`);
    await db_1.default.synchronize();
}
async function main() {
    await db_1.default.initialize();
    await cleadDb();
    await db_1.default
        .createQueryBuilder()
        .insert()
        .into(user_entity_1.default)
        .values([
        {
            firstName: 'Client1',
            lastName: 'CLastname',
            email: 'client1@client.com',
            password: `${await argon2.hash('123456')}`,
            phone: '066080398510',
            role: types_1.UserRoleEnum.user,
        },
        {
            firstName: 'Admin1',
            lastName: 'ALastname',
            email: 'admin1@admin.com',
            password: `${await argon2.hash('123456')}`,
            phone: '068080398510',
            role: types_1.UserRoleEnum.admin,
        },
    ])
        .execute();
    await db_1.default
        .createQueryBuilder()
        .insert()
        .into(category_entity_1.default)
        .values([
        { name: 'snowboard' },
        { name: 'ski' },
        { name: 'boots' },
        { name: 'stick' },
        { name: 'accessory' },
    ])
        .execute();
    const catSnowboard = await db_1.default.getRepository(category_entity_1.default).findOneBy({ name: 'snowboard' });
    const catSky = await db_1.default.getRepository(category_entity_1.default).findOneBy({ name: 'ski' });
    const catShoe = await db_1.default.getRepository(category_entity_1.default).findOneBy({ name: 'boots' });
    const catAccessory = await db_1.default.getRepository(category_entity_1.default).findOneBy({ name: 'accessory' });
    const catStick = await db_1.default.getRepository(category_entity_1.default).findOneBy({ name: 'stick' });
    await db_1.default
        .createQueryBuilder()
        .insert()
        .into(material_entity_1.default)
        .values([
        {
            name: 'Liberty',
            picture: '/uploads/liberty.jpg',
            price: 49,
            sizes: [
                { size: '110', quantity: 20 },
                { size: '115', quantity: 20 },
                { size: '120', quantity: 50 },
            ],
            description: 'La Liberty, avec son flex confortable et son profil Flat Out Rocker est idéale pour les sorties tout-terrain : tolérante et sans accrochage, son comportement est prévisible.',
            category: { id: catSnowboard?.id },
        },
    ])
        .execute();
    await db_1.default
        .createQueryBuilder()
        .insert()
        .into(material_entity_1.default)
        .values([
        {
            name: 'REDSTER Q7.8 REVOSHOCK S',
            picture: '/uploads/redster.jpg',
            price: 33,
            sizes: [
                { size: '150', quantity: 20 },
                { size: '160', quantity: 20 },
                { size: '170', quantity: 50 },
            ],
            description: 'Un excellent ski de piste performant dans toutes les conditions de neige. La technologie Revoshock absorbe les vibrations pour en faire un ski souple mais réactif.',
            category: { id: catSky?.id },
        },
    ])
        .execute();
    await db_1.default
        .createQueryBuilder()
        .insert()
        .into(material_entity_1.default)
        .values([
        {
            name: 'Black Pearl 88 SP',
            picture: '/uploads/black-pearl.jpg',
            price: 33,
            sizes: [
                { size: '200', quantity: 20 },
                { size: '210', quantity: 20 },
                { size: '170', quantity: 50 },
            ],
            description: "Avec sa construction stable et rassurante, ce ski de s'adapte aux exigences et aux performances de chaque skieuse.",
            category: { id: catSky?.id },
        },
    ])
        .execute();
    await db_1.default
        .createQueryBuilder()
        .insert()
        .into(material_entity_1.default)
        .values([
        {
            name: 'TRIXIE',
            picture: '/uploads/trixie.jpg',
            price: 20,
            sizes: [
                { size: '36', quantity: 20 },
                { size: '37', quantity: 20 },
                { size: '38', quantity: 50 },
            ],
            description: "Ski de piste polyvalent et performant quelles que soient les conditions d'enneigement.",
            category: { id: catShoe?.id },
        },
    ])
        .execute();
    await db_1.default
        .createQueryBuilder()
        .insert()
        .into(material_entity_1.default)
        .values([
        {
            name: 'Bâtons de Ski Leki Bold Lite',
            picture: '/uploads/leki-bold-lite.jpg',
            price: 10,
            sizes: [
                { size: '150', quantity: 20 },
                { size: '160', quantity: 20 },
                { size: '170', quantity: 50 },
            ],
            description: "Ces superbes bâtons de ski proviennent de la marque Leki. Le bâton est de haute qualité et est idéal pour les débutants et débutantes grâce à sa polyvalence. Les bâtons sont équipés du système Trigger S, qui leur donne une bonne prise en main et un verrouillage facile. Ainsi, vous pouvez facilement recommencer à skier après vous être arrêté. En cas de chute, un système de clic se déclenche automatiquement, ce qui évite les accidents douloureux. Les bâtons sont équipés d'une poignée antidérapante et ont une bonne prise en main pour éviter de fatiguer les mains. Les bâtons sont en aluminium léger.",
            category: { id: catAccessory?.id },
        },
    ])
        .execute();
    await db_1.default
        .createQueryBuilder()
        .insert()
        .into(material_entity_1.default)
        .values([
        {
            name: 'Allspeed Visor Impacts',
            picture: '/uploads/allspeed-visor.jpg',
            price: 15,
            sizes: [
                { size: 'S', quantity: 20 },
                { size: 'M', quantity: 20 },
                { size: 'XXL', quantity: 50 },
            ],
            description: "Il est doté de notre technologie IMPACTS, combinant une coque rigide et une mousse multi-impact pour une durabilité globale améliorée sans faire de compromis sur l'ajustement, le style ou le poids.",
            category: { id: catAccessory?.id },
        },
    ])
        .execute();
    console.log('done !');
    await db_1.default.destroy();
    process.exit(0);
}
main();
