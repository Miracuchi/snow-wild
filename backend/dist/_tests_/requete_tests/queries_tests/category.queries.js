"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LIST_CATEGORY_WITH_NAME = exports.FIND_CATEGORY_BY_ID = exports.LIST_CATEGORY = void 0;
exports.LIST_CATEGORY = `#graphql
query Query {
  categories {
    id
    
  }
}`;
exports.FIND_CATEGORY_BY_ID = `#graphql
    query FindCategory($findCategoryId: String!) {
	    findCategory(id: $findCategoryId) {
	        id
	        name
	    }
    }
`;
exports.LIST_CATEGORY_WITH_NAME = `#graphql
    query Category {
        categories {        
            name
        }
    }`;
