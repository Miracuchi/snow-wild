import { gql } from "@apollo/client";

export const CREATE_MATERIAL_ADMIN = gql`
  mutation CreateMaterial($data: CreateMaterialInput!) {
    createMaterial(data: $data) {
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

export const DELETE_MATERIAL_ADMIN = gql`
mutation DeleteMaterial($deleteMaterialId: String!) {
  deleteMaterial(id: $deleteMaterialId) {
    id
  }
}
`;