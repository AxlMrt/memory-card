import React from "react";
import Card from "./components/card/Card";
import data from "./components/card/data";

function App() {
  const [cards, setCards] = React.useState([]);
  const [turns, setTurn] = React.useState(0);
  const [choiceOne, setChoiceOne] = React.useState(null);
  const [choiceTwo, setChoiceTwo] = React.useState(null);
  const [disabled, setDisabled] = React.useState(false)

  function shuffleCard() {
    const shuffledCard = [...data, ...data]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random}));

    setCards(shuffledCard);
    setTurn(0);
  }

  function handleChoice(card) {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  }

  React.useEffect(() => {
      if (choiceOne && choiceTwo) {
        setDisabled(true)
        if(choiceOne.src === choiceTwo.src) {
          setCards((prevCard) => {
            return prevCard.map((card) => {
              if(card.src === choiceOne.src) {
                return {...card, matched: true};
              }
              return card;
            });
          });
        };
        setTimeout(() => resetTurn(), 1000);
      };
  }, [choiceOne, choiceTwo])

  function resetTurn() {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurn((prevTurn) => prevTurn + 1);
    setDisabled(false);
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Memory Card Game</h1>
        <button className="p-3 border-2" onClick={shuffleCard}>New Game</button>
      </header>
      <div className="flex align-center justify-center mt-5">
        <div className="max-w-3xl grid grid-cols-4 gap-1">
          {
            cards.map((card, idx) => (
              <Card key={idx}
                card={card}
                handleChoice={handleChoice}
                flipped={card === choiceOne || card === choiceTwo || card.matched}
                disabled={disabled}
              />
            ))
          }
        </div>
      </div>
      <p>Turn : {turns}</p>
    </div>
  );
}

export default App;
