import { gql } from "@apollo/client";

export const GET_USERS = gql`
  query Users {
    users {
      email
      id
      role
      firstName
      lastName
    }
  }
`;