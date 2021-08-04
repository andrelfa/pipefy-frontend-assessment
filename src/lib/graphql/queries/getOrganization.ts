import { gql } from "@apollo/client";

const GET_ORGANIZATION = gql`
  query GetOrganization($id: ID!) {
    organization(id: $id) {
      id
      name
      pipes {
        id
        icon
        name
        cards_count
      }
    }
  }
`;

export default GET_ORGANIZATION;
