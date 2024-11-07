"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DELETE_CATEGORY = exports.CREATE_CATEGORY = void 0;
exports.CREATE_CATEGORY = `#graphql 
mutation CreateCategory($data: CreateCategoryInput!) {
  createCategory(data: $data) {
    id
    name
  }
}`;
exports.DELETE_CATEGORY = `#graphql
  mutation DeleteCategory($deleteCategoryId: String!) {
    deleteCategory(id: $deleteCategoryId) {
      id
      name
    }
  }
`;
