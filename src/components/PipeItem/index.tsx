import PiledCoinsIcon from "../../assets/icons/PiledCoinsIcon";
import { Pipe } from "../../types/Pipe";
import {
  CardsCountText,
  IconContainer,
  NameText,
  NameContainer,
  Wrapper,
} from "./styled";

export type PipeItemProps = {
  pipe: Pipe;
  handlePipeClicked: (pipeId: string) => void;
};

export default function PipeItem({ pipe, handlePipeClicked }: PipeItemProps) {
  const cardsConditionalText =
    pipe.cardsCount > 1 || pipe.cardsCount === 0 ? "cards" : "card";

  return (
    <Wrapper onClick={() => handlePipeClicked(pipe.id)} aria-label="pipe-item">
      <IconContainer>
        <PiledCoinsIcon />
      </IconContainer>
      <NameContainer>
        <NameText>{pipe.name}</NameText>
      </NameContainer>
      <CardsCountText>
        {pipe.cardsCount} {cardsConditionalText}
      </CardsCountText>
    </Wrapper>
  );
}
