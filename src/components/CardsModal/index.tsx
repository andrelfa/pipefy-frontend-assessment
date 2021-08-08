import { Dispatch, SetStateAction } from "react";
import { Node } from "../../types/Cards";
import { formatDate } from "../../utils/formatter";
import { Backdrop, Container } from "./styled";

type CardsModalProps = {
  setShowCardsModal: Dispatch<SetStateAction<boolean>>;
  cards: Node[];
  cardsLoading: boolean;
};

export default function CardsModal({
  setShowCardsModal,
  cards,
  cardsLoading,
}: CardsModalProps) {
  function handleCardsDisplay(cards: Node[]) {
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
          <p>No cards to show</p>
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
