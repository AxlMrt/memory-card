import React from 'react';

function Card({ card, handleChoice, flipped, disabled }) {

  function handleClick() {
    if(!disabled) handleChoice(card);
  }
  console.log(card)
  return (
    <div className='card relative '>
      <div className={flipped ? 'flipped' : ""}>
        <img className="front" src={`./img/${card.src}`} alt="card front"/>
        <img className="back" src="./img/cover.png" onClick={handleClick} alt="card back"/>
      </div>
    </div>
    
  );
}

export default Card;