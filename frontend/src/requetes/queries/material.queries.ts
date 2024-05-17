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

export const GET_MATERIAL = gql`
  query GetMaterial($id: ID!) {
    material(id: $id) {
      id
      name
      description
      picture
    }
  }
`;