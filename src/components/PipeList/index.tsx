import { Dispatch, SetStateAction, useCallback } from "react";
import { Pipe } from "../../types/Pipe";
import PipeItem from "../PipeItem";
import { PipeItemsWrapper, Button, EndOfListText } from "./styled";

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
          <EndOfListText aria-label="no-more-pipes">
            No more pipes to load.
          </EndOfListText>
        ) : (
          <Button onClick={handleLoadMore} aria-label="load-more-btn">
            +
          </Button>
        )}
      </div>
    </>
  );
}
