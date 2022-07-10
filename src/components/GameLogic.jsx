import React , { useEffect } from "react";

const GameLogic = ({ numTowers, numDiscs }) => {
  // resets game components setup and calls initial drop animation
	useEffect(() => {
    
	}, [numTowers, numDiscs]);

  // Don't forget to return removeEventListener if needed
	// space bar and 'mousedown' to toggle animation if animation button is enabled
	useEffect(() => {

	}, []);

  return (
    <>
      <h1>{numTowers}</h1>
      <h1>{numDiscs}</h1>
    </>
  );
}

export default GameLogic;