import {
  ApolloError,
  OperationVariables,
  QueryLazyOptions,
  useLazyQuery,
} from "@apollo/client";
import { CardNode } from "../../../types/Cards";
import { keysToCamelCase } from "../../../utils/helpers";
import GET_CARDS, { GetCardsType } from "../queries/getCards";

type UseGetCards = {
  cardsData: CardNode[];
  cardsLoading: boolean;
  cardsError: ApolloError | undefined;
  loadCards: (
    options?: QueryLazyOptions<OperationVariables> | undefined
  ) => void;
};

export default function useGetCards(pipeId: string): UseGetCards {
  const [loadCards, { loading, error, data }] = useLazyQuery<GetCardsType>(
    GET_CARDS,
    {
      variables: { pipeId },
    }
  );

  return {
    cardsData: data?.cards?.edges.length
      ? (data?.cards?.edges
          .map((item) => item.node)
          .map(keysToCamelCase) as CardNode[])
      : [],
    cardsLoading: loading,
    cardsError: error,
    loadCards,
  };
}
