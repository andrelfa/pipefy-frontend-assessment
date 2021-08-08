import { ApolloError } from "@apollo/client";
import { Dispatch, SetStateAction } from "react";
import { CardNode } from "../../types/Cards";
import { formatDate } from "../../utils/formatter";
import { Backdrop, Container } from "./styled";

type CardsModalProps = {
  setShowCardsModal: Dispatch<SetStateAction<boolean>>;
  cards: CardNode[];
  cardsLoading: boolean;
  error: ApolloError | undefined;
};

export default function CardsModal({
  setShowCardsModal,
  cards,
  cardsLoading,
  error,
}: CardsModalProps) {
  function handleCardsDisplay(cards: CardNode[]) {
    if (error) return <p>Couldn't load the cards</p>;
    return (
      <>
        {cards.length && !cardsLoading ? (
          <>
            {cards.map((card) => (
              <p key={card.id} aria-label={"card-item"}>
                {formatDate(card.createdAt)} - {card.title}
              </p>
            ))}
          </>
        ) : (
          <p aria-label={"no-more-cards"}>No cards to show</p>
        )}
      </>
    );
  }
  return (
    <Backdrop onClick={() => setShowCardsModal(false)}>
      <Container onClick={(event) => event.stopPropagation()}>
        {cardsLoading ? <p>Loading cards...</p> : handleCardsDisplay(cards)}
      </Container>
    </Backdrop>
  );
}
