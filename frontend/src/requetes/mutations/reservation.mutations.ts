import { gql } from "@apollo/client";

export const CREATE_RESERVATION = gql`
  mutation Mutation($data: CreateReservationInput!) {
    createReservation(data: $data) {
      end_date
      start_date
      reservationMaterials {
        material {
          name
        }
        price
        quantity
        size
      }
    }
  }
`;
