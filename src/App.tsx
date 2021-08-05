import { useEffect, useState } from "react";
import "./App.css";
import CardsModal from "./components/CardsModal/CardsModal";
import { Button, EndOfListText, Wrapper } from "./styled";
import PipeList from "./components/PipeList/PipeList";
import useGetCards from "./lib/graphql/hooks/useGetCards";
import useGetOrganizationPipes from "./lib/graphql/hooks/useGetOrganizationPipes";
import { Pipe } from "./types/Pipe";

function App() {
  const [showCardsModal, setShowCardsModal] = useState(false);
  const [selectedPipeId, setSelectedPipeId] = useState("");
  const [pipes, setPipes] = useState<Pipe[]>([]);

  const { pipeLoading, pipeErrors, pipeData } = useGetOrganizationPipes();
  const { loadCards, cardsLoading, cardsData } = useGetCards(selectedPipeId);

  useEffect(() => {
    setPipes(pipeData.slice(0, 10));
  }, [pipeData]);

  const handlePipeClicked = (pipeId: string) => {
    setSelectedPipeId(pipeId);
    setShowCardsModal(true);
    loadCards();
  };

  const handleLoadMore = () => {
    const currentLastItem = pipes[pipes.length - 1];
    const currentLastIndex = pipes.indexOf(currentLastItem);
    setPipes((currentPipes) =>
      currentPipes.concat(
        pipeData.slice(currentLastIndex + 1, currentLastIndex + 10)
      )
    );
  };

  if (pipeErrors) return <p>Something went wrong</p>;
  if (pipeLoading) return <p>Loading...</p>;
  return (
    <Wrapper>
      <PipeList pipes={pipes} handlePipeClicked={handlePipeClicked} />
      {pipes.length === pipeData.length ? (
        <EndOfListText>No more pipes to load.</EndOfListText>
      ) : (
        <Button onClick={handleLoadMore}>+</Button>
      )}
      {showCardsModal && (
        <CardsModal
          cardsLoading={cardsLoading}
          cards={cardsData}
          setShowCardsModal={setShowCardsModal}
        />
      )}
    </Wrapper>
  );
}

export default App;
