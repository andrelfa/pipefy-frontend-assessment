import { gql } from "@apollo/client";
import { Cards } from "../../../types/Cards";

export type GetCardsType = {
  cards: Cards;
};

const GET_CARDS = gql`
  query GetCards($pipeId: ID!) {
    cards(pipe_id: $pipeId) {
      edges {
        node {
          id
          created_at
          title
        }
      }
    }
  }
`;

export default GET_CARDS;
