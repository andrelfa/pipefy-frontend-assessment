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
  return {
    pipes,
    loadMoreBtn,
    ...utils,
  };
};

describe("<PipeList>", () => {
  it("renders without crashing", () => {
    const { container } = setup();
    expect(container).toBeInTheDocument();
  });

  it("should render the first 10 pipes", () => {
    const { pipes } = setup();
    expect(pipes).toHaveLength(10);
  });

  it("should render 10 more pipes after button is clicked", async () => {
    const { pipes, loadMoreBtn } = setup();
    expect(pipes).toHaveLength(10);
    fireEvent.click(loadMoreBtn);
    setTimeout(() => {
      expect(pipes).toHaveLength(20);
    }, 2000);
  });

  it("should render all 24 pipes after button is clicked twice", async () => {
    const { pipes, loadMoreBtn } = setup();
    expect(pipes).toHaveLength(10);
    fireEvent.click(loadMoreBtn);
    setTimeout(() => {
      expect(pipes).toHaveLength(20);
    }, 2000);
    fireEvent.click(loadMoreBtn);
    setTimeout(() => {
      expect(pipes).toHaveLength(24);
    }, 2000);
  });

  it(`should hide 'load-more-btn' and display 'no-more-pipes' message 
  after all pipes have been rendered`, async () => {
    const { pipes, loadMoreBtn } = setup();
    expect(pipes).toHaveLength(10);
    fireEvent.click(loadMoreBtn);
    setTimeout(() => {
      expect(pipes).toHaveLength(20);
    }, 2000);
    fireEvent.click(loadMoreBtn);
    setTimeout(() => {
      expect(pipes).toHaveLength(24);
    }, 2000);
    expect(loadMoreBtn).not.toBeInTheDocument();
    const noMorePipesText = setup().getByLabelText("no-more-pipes");
    expect(noMorePipesText).toBeInTheDocument();
  });
});
