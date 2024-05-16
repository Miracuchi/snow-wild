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