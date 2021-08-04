import { useLazyQuery } from "@apollo/client";
import GET_CARDS, { GetCardsType } from "../queries/getCards";

export default function useGetCards(pipeId: string) {
  const [loadCards, { loading, error, data }] = useLazyQuery<GetCardsType>(
    GET_CARDS,
    {
      variables: { pipeId },
    }
  );

  return {
    cardsData: data?.cards?.edges.length
      ? data?.cards?.edges.map((item) => item.node)
      : [],
    cardsLoading: loading,
    cardsError: error,
    loadCards,
  };
}
