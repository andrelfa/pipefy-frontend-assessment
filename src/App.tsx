import { useCallback, useEffect, useState } from "react";
import "./App.css";
import CardsModal from "./components/CardsModal";
import { Wrapper } from "./styled";
import PipeList from "./components/PipeList";
import useGetCards from "./lib/graphql/hooks/useGetCards";
import useGetOrganizationPipes from "./lib/graphql/hooks/useGetOrganizationPipes";
import { Pipe } from "./types/Pipe";

function App() {
  const [showCardsModal, setShowCardsModal] = useState(false);
  const [selectedPipeId, setSelectedPipeId] = useState("");
  const [pipes, setPipes] = useState<Pipe[]>([]);

  const { pipeLoading, pipeError, pipeData } = useGetOrganizationPipes();
  const { loadCards, cardsLoading, cardsError, cardsData } =
    useGetCards(selectedPipeId);

  // Handling client side pagination
  useEffect(() => {
    setPipes(pipeData.slice(0, 10));
  }, [pipeData]);

  const handlePipeClicked = useCallback(
    (pipeId: string) => {
      setSelectedPipeId(pipeId);
      setShowCardsModal(true);
      loadCards();
    },
    [setSelectedPipeId, setShowCardsModal, loadCards]
  );

  if (pipeError) return <p>Something went wrong</p>;
  if (pipeLoading) return <p>Loading...</p>;
  return (
    <Wrapper>
      <PipeList
        pipes={pipes}
        handlePipeClicked={handlePipeClicked}
        pipeData={pipeData}
        setPipes={setPipes}
      />
      {showCardsModal && (
        <CardsModal
          cardsLoading={cardsLoading}
          cards={cardsData}
          setShowCardsModal={setShowCardsModal}
          error={cardsError}
        />
      )}
    </Wrapper>
  );
}

export default App;
