"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("@apollo/server");
const mock_1 = require("@graphql-tools/mock");
const schema_1 = require("@graphql-tools/schema");
const assert_1 = __importDefault(require("assert"));
const graphql_1 = require("graphql");
const type_graphql_1 = require("type-graphql");
const category_resolver_1 = __importDefault(require("../../src/resolvers/category.resolver"));
const category_mutation_1 = require("../requete_tests/mutations_tests/category.mutation");
const category_queries_1 = require("../requete_tests/queries_tests/category.queries");
const categoryData = [
    { id: '1', name: 'Catégorie 1', material: [] },
    { id: '2', name: 'Catégorie 2', material: [] },
];
let server;
const baseSchema = (0, type_graphql_1.buildSchemaSync)({
    resolvers: [category_resolver_1.default],
    authChecker: () => true,
});
const schemaString = (0, graphql_1.printSchema)(baseSchema);
const schema = (0, schema_1.makeExecutableSchema)({ typeDefs: schemaString });
beforeAll(async () => {
    const store = (0, mock_1.createMockStore)({ schema });
    store.set('Query', 'ROOT', 'categories', categoryData);
    const resolvers = (store) => ({
        Query: {
            categories() {
                return store.get('Query', 'ROOT', 'categories');
            },
            findCategory(_, id) {
                return store.get('Category', id);
            },
        },
        Mutation: {
            createCategory(_, { data }) {
                store.set('Category', '3', data);
                return store.get('Category', '3');
            },
            deleteCategory(_, { id }) {
                const categoryToDelete = store.get('Category', id);
                store.set('Query', 'ROOT', 'categories', categoryData.filter((category) => category.id !== id));
                return categoryToDelete;
            },
        },
    });
    server = new server_1.ApolloServer({
        schema: (0, mock_1.addMocksToSchema)({
            schema: baseSchema,
            store,
            resolvers,
        }),
    });
});
const categoryIds = categoryData.map((category) => ({ id: category.id }));
describe('Test sur les catégorie', () => {
    it('Récupération des catégorie depuis le store', async () => {
        const response = await server.executeOperation({
            query: category_queries_1.LIST_CATEGORY,
        });
        (0, assert_1.default)(response.body.kind === 'single');
        console.log(response);
        expect(response.body.singleResult.data).toEqual({
            categories: categoryIds,
        });
    });
    it('Ajout une caregorie', async () => {
        const createResponse = await server.executeOperation({
            query: category_mutation_1.CREATE_CATEGORY,
            variables: {
                data: {
                    name: 'Categorie 3',
                },
            },
        });
        (0, assert_1.default)(createResponse.body.kind === 'single');
        expect(createResponse.body.singleResult.data).toEqual({
            createCategory: {
                id: '3',
                name: 'Categorie 3',
            },
        });
    });
    it('Récupérer une catégorie', async () => {
        const recupResponse = await server.executeOperation({
            query: category_queries_1.FIND_CATEGORY_BY_ID,
            variables: {
                findCategoryId: '2',
            },
        });
        (0, assert_1.default)(recupResponse.body.kind === 'single');
        expect(recupResponse.body.singleResult.data).toEqual({
            findCategory: {
                id: '2',
                name: 'Catégorie 2',
            },
        });
    });
    test('Effacer une catégorie', async () => {
        const deleteResponse = await server.executeOperation({
            query: category_mutation_1.DELETE_CATEGORY,
            variables: {
                deleteCategoryId: '1',
            },
        });
        (0, assert_1.default)(deleteResponse.body.kind === 'single');
        expect(deleteResponse.body.singleResult.data).toEqual({
            deleteCategory: {
                id: '1',
                name: 'Catégorie 1',
            },
        });
    });
});
