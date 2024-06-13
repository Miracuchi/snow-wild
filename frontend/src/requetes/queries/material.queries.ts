import { gql } from "@apollo/client";

export const LIST_MATERIAL= gql`
query ListMaterials {
  listMaterials {
    id
    name
    category {
      id
      name
    }
    picture
    price
    quantity
    description
  }
}
`;

export const GET_MATERIAL_BY_ID = gql`
query FindMaterialById($findMaterialByIdId: String!) {
  findMaterialById(id: $findMaterialByIdId) {
    category {
      id
      name
    }
    description
    name
    picture
    price
    quantity
  }
}
`;
export const LIST_MATERIAL_BY_CATEGORY_ID = gql`
query FindMaterialByCategories($findMaterialByCategoriesId: String!) {
  findMaterialByCategories(id: $findMaterialByCategoriesId) {
    picture
    name
    id
    description
  }
}
`;