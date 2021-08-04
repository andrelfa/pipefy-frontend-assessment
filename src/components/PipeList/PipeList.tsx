import { Pipe } from "../../types/Pipe";
import PipeItem from "../PipeItem/PipeItem";
import { PipeItemsWrapper, Wrapper } from "./styled";

type PipeListProps = {
  pipes: Pipe[];
  handlePipeClicked: (pipeId: string) => void;
};

export default function PipeList({ pipes, handlePipeClicked }: PipeListProps) {
  return (
    <>
      <Wrapper>
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
      </Wrapper>
    </>
  );
}
