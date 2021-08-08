import { render } from "@testing-library/react";
import { useState } from "react";
import { ThemeProvider } from "styled-components";
import { mockedCards } from "../../mocks/cards";
import { mockedPipes } from "../../mocks/pipes";
import { theme } from "../../theme";
import { Pipe } from "../../types/Pipe";
import { formatDate } from "../../utils/formatter";
import CardsModal from "../CardsModal";

function CardsModalWrapper() {
  const [showCardsModal, setShowCardsModal] = useState(false);
  const [cardsLoading, setCardsLoading] = useState(false);

  return (
    <ThemeProvider theme={theme}>
      <CardsModal
        setShowCardsModal={setShowCardsModal}
        cards={mockedCards}
        cardsLoading={cardsLoading}
      />
    </ThemeProvider>
  );
}

const setup = () => {
  const utils = render(<CardsModalWrapper />);
  const cardItems = utils.getAllByLabelText("card-item");
  return {
    cardItems,
    ...utils,
  };
};

describe("<CardsModal>", () => {
  it("renders without crashing", () => {
    const { container } = setup();
    expect(container).toBeInTheDocument();
  });

  it("should render the correct number of cards", () => {
    const { cardItems } = setup();
    expect(cardItems).toHaveLength(mockedCards.length);
  });

  it("should render each card inside the modal with the correct '{createdAt} - {text}' format", () => {
    const { cardItems } = setup();
    expect(cardItems).toHaveLength(mockedCards.length);
    cardItems.forEach((item, index) => {
      const respectiveCard = mockedCards[index];
      const textToCompare = `${formatDate(respectiveCard.createdAt)} - ${
        respectiveCard.title
      }`;
      expect(item.textContent).toEqual(textToCompare);
    });
  });
});
