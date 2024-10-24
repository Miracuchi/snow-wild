"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("@apollo/server");
const type_graphql_1 = require("type-graphql");
const category_resolver_1 = __importDefault(require("../../src/resolvers/category.resolver"));
const mock_1 = require("@graphql-tools/mock");
const assert_1 = __importDefault(require("assert"));
const category_queries_1 = require("../requete_tests/queries_tests/category.queries");
const id1 = '1';
const id2 = '2';
const categoryData = [
    { id: id1, name: 'Categorie 1', material: [] },
    { id: id2, name: 'Catégorie 2', material: [] },
];
let server;
const baseSchema = (0, type_graphql_1.buildSchemaSync)({
    resolvers: [category_resolver_1.default],
    authChecker: () => true,
});
beforeAll(async () => {
    const resolvers = () => ({
        Query: {
            categories() {
                return categoryData;
            },
            findCategory(_, args) {
                return categoryData.find((b) => b.id == args.id);
            },
        },
    });
    server = new server_1.ApolloServer({
        schema: (0, mock_1.addMocksToSchema)({
            schema: baseSchema,
            resolvers: resolvers,
        }),
    });
});
describe('Test sur les categories', () => {
    it('mon premier test', async () => {
        const response = await server.executeOperation({
            query: category_queries_1.LIST_CATEGORY,
        });
        (0, assert_1.default)(response.body.kind === 'single');
        expect(response.body.singleResult.data?.categories).toHaveLength(2);
    });
    it("récupération des categories uniquement avec leurs nom", async () => {
        const response = await server.executeOperation({
            query: category_queries_1.LIST_CATEGORY_WITH_NAME,
        });
        (0, assert_1.default)(response.body.kind === 'single');
        expect(response.body.singleResult.data).toEqual({
            categories: [{ name: 'Categorie 1' }, { name: 'Catégorie 2' }],
        });
    });
    it("récupération d'une catégorie avec son nom", async () => {
        const response = await server.executeOperation({
            query: category_queries_1.FIND_CATEGORY_BY_ID,
            variables: {
                findCategoryId: id1,
            },
        });
        (0, assert_1.default)(response.body.kind === 'single');
        expect(response.body.singleResult.data).toEqual({
            findCategory: {
                id: categoryData[0].id,
                name: categoryData[0].name,
            }
        });
    });
});
