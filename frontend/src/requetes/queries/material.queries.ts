import { gql } from "@apollo/client";

export const LIST_MATERIAL= gql`
query ListMaterial {
  listMaterials {
    picture
    name
    id
    description
    
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
