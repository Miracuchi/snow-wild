"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-undef */
const server_1 = require("@apollo/server");
const assert_1 = __importDefault(require("assert"));
const type_graphql_1 = require("type-graphql");
const uuidv4_1 = require("uuidv4");
const db_1 = __importDefault(require("../../src/db"));
const db_test_1 = __importDefault(require("../../src/db_test"));
const category_entity_1 = __importDefault(require("../../src/entities/category.entity"));
const category_resolver_1 = __importDefault(require("../../src/resolvers/category.resolver"));
const category_mutation_1 = require("../requete_tests/mutations_tests/category.mutation");
const category_queries_1 = require("../requete_tests/queries_tests/category.queries");
let server;
const baseSchema = (0, type_graphql_1.buildSchemaSync)({
    resolvers: [category_resolver_1.default],
    authChecker: () => true,
});
beforeAll(async () => {
    server = new server_1.ApolloServer({
        schema: baseSchema,
    });
    jest
        .spyOn(db_1.default, 'getRepository')
        .mockReturnValue(db_test_1.default.getRepository(category_entity_1.default));
    await db_test_1.default.initialize();
    //   await datasourceTest.getRepository(Category).clear();
});
// afterAll(async () => {
//   await datasourceTest.dropDatabase(); //suppression de la base de donnée
// });
describe('Affichage de la liste des catégories', () => {
    it('récupération de la liste des livres en base', async () => {
        //ici notre code de test
        const response = await server.executeOperation({
            query: category_queries_1.LIST_CATEGORY,
        });
        (0, assert_1.default)(response.body.kind === 'single');
        expect(response.body.singleResult.data?.categories).toHaveLength(0);
    });
    it.only('création de catégorie puis suppression', async () => {
        const response = await server.executeOperation({
            query: category_mutation_1.CREATE_CATEGORY,
            variables: {
                data: { name: 'Snowboard' },
            },
        });
        (0, assert_1.default)(response.body.kind === 'single');
        const id = response.body.singleResult.data?.createCategory.id;
        const name = response.body.singleResult.data?.createCategory.name;
        console.log('RESPONSE', JSON.stringify(response));
        expect(id).not.toBeNull(); // je m'assure que l'id n'est pas null
        expect((0, uuidv4_1.isUuid)(`${id}`)).toBeTruthy(); // que c'est bien un uuid valide
        expect(response.body.singleResult.data?.createCategory.name).toEqual('Snowboard');
        // déportation de delete dans la creation pour accéder à l'id
        const deleteresponse = await server.executeOperation({
            query: category_mutation_1.DELETE_CATEGORY,
            variables: {
                deleteCategoryId: id,
            },
        });
        (0, assert_1.default)(deleteresponse.body.kind === 'single');
        console.log('DELETERESPONSE', JSON.stringify(deleteresponse));
        expect(deleteresponse.body.singleResult.data?.deleteCategory).toEqual({
            id: id,
            name: name,
        });
    });
    it('récupération de la liste des livres en base après ajout', async () => {
        //ici notre code de test
        const response = await server.executeOperation({
            query: category_queries_1.LIST_CATEGORY,
        });
        (0, assert_1.default)(response.body.kind === 'single');
        expect(response.body.singleResult.data?.categories).toHaveLength(1);
    });
});
