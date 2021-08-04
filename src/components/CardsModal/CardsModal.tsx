import { Dispatch, SetStateAction } from "react";
import { Node } from "../../types/Cards";
import { Backdrop, Container } from "./styled";

type CardsModalProps = {
  setShowCardsModal: Dispatch<SetStateAction<boolean>>;
  cards: Node[];
};

export default function CardsModal({
  setShowCardsModal,
  cards,
}: CardsModalProps) {
  return (
    <Backdrop onClick={() => setShowCardsModal(false)}>
      <Container>
        {cards.map((card) => (
          <p key={card.id}>
            {card.created_at} - {card.title}
          </p>
        ))}
      </Container>
    </Backdrop>
  );
}
