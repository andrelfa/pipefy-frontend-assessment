import { useState } from "react";
import "./App.css";
import CardsModal from "./components/CardsModal/CardsModal";
import PipeList from "./components/PipeList/PipeList";
import useGetCards from "./lib/graphql/hooks/useGetCards";
import useGetOrganization from "./lib/graphql/hooks/useGetOrganizationPipes";

function App() {
  const [showCardsModal, setShowCardsModal] = useState(false);
  const [selectedPipeId, setSelectedPipeId] = useState("");

  const { pipeLoading, pipeErrors, pipeData } = useGetOrganization();
  const { loadCards, cardsLoading, cardsError, cardsData } =
    useGetCards(selectedPipeId);

  const handlePipeClicked = (pipeId: string) => {
    setSelectedPipeId(pipeId);
    setShowCardsModal(true);
    loadCards();
  };

  if (pipeErrors) return <p>Something went wrong</p>;
  if (pipeLoading) return <p>Loading...</p>;
  return (
    <>
      <PipeList pipes={pipeData} handlePipeClicked={handlePipeClicked} />
      {showCardsModal && (
        <CardsModal cards={cardsData} setShowCardsModal={setShowCardsModal} />
      )}
    </>
  );
}

export default App;
