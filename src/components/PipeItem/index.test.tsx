import { fireEvent, render } from "@testing-library/react";
import { useState } from "react";
import { ThemeProvider } from "styled-components";
import PipeItem from ".";
import { mockedPipes } from "../../mocks/pipes";
import { theme } from "../../theme";
import { Pipe } from "../../types/Pipe";

function PipeItemWrapper() {
  const [pipes, setPipes] = useState<Pipe[]>(mockedPipes.slice(0, 10));

  const handlePipeClicked = () => {};

  return (
    <ThemeProvider theme={theme}>
      <PipeItem pipe={mockedPipes[0]} handlePipeClicked={handlePipeClicked} />
    </ThemeProvider>
  );
}

const setup = () => {
  const utils = render(<PipeItemWrapper />);
  const pipeItem = utils.getByLabelText("pipe-item");
  const pipeIcon = utils.getByLabelText("pipe-icon");
  const pipeName = utils.getByLabelText("pipe-name");
  const pipeCardsCount = utils.getByLabelText("pipe-cards-count");
  const numberOfPages = Math.ceil(mockedPipes.length / 10);
  return {
    numberOfPages,
    pipeItem,
    pipeIcon,
    pipeName,
    pipeCardsCount,
    ...utils,
  };
};

describe("<PipeItem>", () => {
  it("renders without crashing", () => {
    const { container } = setup();
    expect(container).toBeInTheDocument();
  });

  it("should render svg icon", () => {
    const { pipeIcon } = setup();
    expect(pipeIcon).toBeInTheDocument();
  });

  it("should render the same name as the pipe object name property", () => {
    const { pipeName } = setup();
    expect(pipeName).toBeInTheDocument();
    expect(pipeName.textContent).toEqual(mockedPipes[0].name);
  });

  it("should render the cards count text with correct subsequent text (card or cards)", () => {
    const { pipeCardsCount } = setup();
    expect(pipeCardsCount).toBeInTheDocument();
    const cardsConditionalText =
      mockedPipes[0].cardsCount > 1 || mockedPipes[0].cardsCount === 0
        ? "cards"
        : "card";
    const expectedText = `${mockedPipes[0].cardsCount} ${cardsConditionalText}`;
    expect(pipeCardsCount.textContent).toEqual(expectedText);
  });
});
