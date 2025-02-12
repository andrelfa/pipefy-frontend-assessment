import { Dispatch, SetStateAction, useCallback } from "react";
import { Pipe } from "../../types/Pipe";
import PipeItem from "../PipeItem";
import { PipeItemsWrapper, Button, MarginLeftText } from "./styled";

type PipeListProps = {
  pipes: Pipe[];
  handlePipeClicked: (pipeId: string) => void;
  pipeData: Pipe[];
  setPipes: Dispatch<SetStateAction<Pipe[]>>;
};

export default function PipeList({
  pipes,
  handlePipeClicked,
  pipeData,
  setPipes,
}: PipeListProps) {
  // Handling client side pagination
  const handleLoadMore = useCallback(() => {
    const currentLastItem = pipes[pipes.length - 1];
    const currentLastIndex = pipes.indexOf(currentLastItem);
    setPipes((currentPipes) =>
      currentPipes.concat(
        pipeData.slice(currentLastIndex + 1, currentLastIndex + 10)
      )
    );
  }, [pipes, pipeData, setPipes]);

  return (
    <>
      <div>
        Your Pipes
        <PipeItemsWrapper>
          {pipes.map((pipe) => (
            <PipeItem
              pipe={pipe}
              key={pipe.id}
              handlePipeClicked={handlePipeClicked}
            />
          ))}
        </PipeItemsWrapper>
        {pipes.length === pipeData.length ? (
          <MarginLeftText aria-label="no-more-pipes">
            No more pipes to show.
          </MarginLeftText>
        ) : (
          <Button onClick={handleLoadMore} aria-label="load-more-btn">
            +
          </Button>
        )}
        <MarginLeftText>
          {pipes.length} of{" "}
          <strong aria-label="total-of-pipes">{pipeData.length}</strong>
        </MarginLeftText>
      </div>
    </>
  );
}
