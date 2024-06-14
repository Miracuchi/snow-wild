import { gql } from "@apollo/client";
export const REGISTER = gql`
mutation Mutation($data: CreateReservationInput!) {
  createReservation(data: $data) {
    end_date
    start_date
    reservationMaterials {
      material {
        name
        id
      }
      price
      quantity
      size
    }
  }
}
}
`;
