import React , { useState, useEffect } from "react";

const GameLogic = ({ numTowers, numDiscs, source, destination, animate }) => {
  // gameState contains an array whose elements represent individual tower states
  // tower states will be maintained as an array, similating stack, of Disc references
  const [gameState, setGameState] = useState([]);
  
  // resets game components setup and gameState and calls initial drop animation
	useEffect(() => {
    
	}, [numDiscs, numTowers]);

  // adjusts source tower and applies highlight (will cause gameState to be reset)
  useEffect(() => {

  }, [source]);

  // adjusts destination tower and applies highlight (does not cause gameState to be reset)
  useEffect(() => {

  }, [destination]);

  // solution animation
  useEffect(() => {
    // if animate, call play() with args of current gameState
    // else, call pause()
  }, [animate])

  // Don't forget to return removeEventListener if needed
	// space bar and 'mousedown' to toggle animation if animation button is enabled
	useEffect(() => {

	}, []);

  // animateDrop will be passed down and called by discs after release to change gameState
  // const animateDrop = ((ref to disc), height?, )

  // disc and tower creation depends on gameState
  // below has the purpose to display the discs and towers according to gameState
  return (
    <>
      <h1>{numTowers}</h1>
      <h1>{numDiscs}</h1>
      <h1>{source}</h1>
      <h1>{destination}</h1>
      <h1>{animate ? 1 : 0}</h1>
    </>
  );
}

export default GameLogic;