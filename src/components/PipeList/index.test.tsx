import {
  fireEvent,
  render,
  screen,
  wait,
  waitFor,
} from "@testing-library/react";
import { useState } from "react";
import { ThemeProvider } from "styled-components";
import PipeList from ".";
import { mockedPipes } from "../../mocks/pipes";
import { theme } from "../../theme";
import { Pipe } from "../../types/Pipe";

function PipeListWrapper() {
  const [pipes, setPipes] = useState<Pipe[]>(mockedPipes.slice(0, 10));

  const handlePipeClicked = () => {};

  return (
    <ThemeProvider theme={theme}>
      <PipeList
        pipes={pipes}
        handlePipeClicked={handlePipeClicked}
        pipeData={mockedPipes}
        setPipes={setPipes}
      />
    </ThemeProvider>
  );
}

const setup = () => {
  const utils = render(<PipeListWrapper />);
  const pipes = utils.queryAllByLabelText("pipe-item");
  const loadMoreBtn = utils.getByLabelText("load-more-btn");
  const numberOfPages = Math.ceil(mockedPipes.length / 10);
  return {
    pipes,
    loadMoreBtn,
    numberOfPages,
    ...utils,
  };
};

describe("<PipeList>", () => {
  it("renders without crashing", () => {
    const { container } = setup();
    expect(container).toBeInTheDocument();
  });

  it("should render the first set/page of pipes (10 pipes)", () => {
    const { pipes } = setup();
    expect(pipes).toHaveLength(10);
  });

  it("should render more pipes after button is clicked if there are more pipes to show", async () => {
    const { pipes, loadMoreBtn, numberOfPages } = setup();
    expect(pipes).toHaveLength(10);
    for (let i = 1; i <= numberOfPages; i++) {
      fireEvent.click(loadMoreBtn);
    }
    setTimeout(() => {
      expect(pipes).toHaveLength(mockedPipes.length);
    }, 2000);
  });

  it(`should hide 'load-more-btn' and display 'no-more-pipes' message
  after all pipes have been rendered`, async () => {
    const { pipes, loadMoreBtn, numberOfPages } = setup();
    expect(pipes).toHaveLength(10);
    for (let i = 1; i <= numberOfPages; i++) {
      fireEvent.click(loadMoreBtn);
    }
    setTimeout(() => {
      expect(pipes).toHaveLength(mockedPipes.length);
    }, 2000);
    const noMorePipesText = setup().getByLabelText("no-more-pipes");
    expect(noMorePipesText).toBeInTheDocument();
  });
});
