import { gql } from "@apollo/client";

export const LIST_MATERIAL= gql`
query ListMaterial {
  listMaterials {
    picture
    name
    id
    description
    price
   
  }
}
`;

export const GET_MATERIAL_BY_ID = gql`
  query Query($findMaterialByIdId: String!) {
  findMaterialById(id: $findMaterialByIdId) {
    price
    picture
    name
    id
    description
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