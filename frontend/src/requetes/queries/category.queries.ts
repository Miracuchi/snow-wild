import { gql } from "@apollo/client";

export const LIST_CATEGORIES= gql`
query ListCategory {
  listCategories{
    name
    id 
  }
}
`;