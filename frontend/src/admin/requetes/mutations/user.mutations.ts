import { gql } from "@apollo/client";

export const CREATE_USERS_BY_ADMIN = gql`
mutation AdminRegister($infos: AdminInputRegister!) {
  adminRegister(infos: $infos) {
    email
    firstName
    id
    lastName
    role
    phone
  }
}
`

export const DELETE_USER_BY_ADMIN = gql`
  mutation DeleteAdminUser($deleteAdminUserId: String!) {
    deleteAdminUser(id: $deleteAdminUserId) {
      id
      firstName
      email
      lastName
      password
      phone
      role
    }
  }
`;
export const UPDATE_USER_BY_ADMIN = gql`
  mutation UpdateUser($updateUserId: String!, $infos: InputAdminUpdateUser!) {
    updateUser(id: $updateUserId, infos: $infos) {
      role
      phone
      lastName
      id
      firstName
      email
    }
  }
`;