import React , { useState, useRef, useEffect } from "react";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";
import useSound from "use-sound";
import { Canvas } from "@react-three/fiber";
import Disc from "./game/Disc";
import Tower from "./game/Tower";
import { PerspectiveCamera } from "@react-three/drei";

const GameLogic = ({ procedure, numTowers, numDiscs, source, destination, texture, animate }) => {
  // initial disc state
  const initDiscs = [...Array(numDiscs)].map((_, index) => 0.7-0.3*index/(numDiscs-1));

  // NOTE: top size of disc stored in last element in discs => all discs will check to enable movement only if it's the topmost disc
  // resets gameState
  const resetState = () => [...Array(numTowers)].map((_, index) => index === source ? initDiscs : []);

  // gameState is an array whose elements represent individual tower states
  // maintained as an array, similating stack, of Disc sizes (unique identifier)
  // call alert whenever gameState is about to be reset (perhaps insider the function call to reset())
  const [gameState, setGameState] = useState(resetState());
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [screenHeight, setScreenHeight] = useState(window.innerHeight);
  const [click] = useSound(process.env.PUBLIC_URL + "/assets/sounds/click.mp3");
  const numRenders = useRef(0);

  // click sound effect played upon sidebar state change
  useEffect(() => {numRenders.current++ < 3 || click()}, 
    [procedure, numTowers, numDiscs, source, destination, texture, animate, click]);

  // check for winning state in gameState after gameState mutation
  useEffect(() => {

  }, [gameState]);

  // resets gameState if unable to decrease towers, else mutates gameState
	useEffect(() => {
    // can find request to number of towers changed by comparing current prop numTowers with gameState
	}, [numTowers]);

  // mutates gameState (takes away smallest Disc if decreasing or adds Disc if increasing)
	useEffect(() => {
    // can find request to number of discs changed by comparing current prop numDiscs with gameState
	}, [numDiscs]);

  // resets state
  useEffect(() => {

  }, [source]);

  // solution animation
  useEffect(() => {
    // will need to input args, possible: gameState, source, destination, procedure
    // animation will be in effects.js, which calls on procedures.js for checks and solution algorithm
    // if animate, call play() with args of current gameState, else call pause()
    // animate ? play() : pause()
    // calling pause will bring disc back to original position before leave
  }, [animate]);

  // Don't forget to return removeEventListener if needed
	// space bar and 'mousedown' to toggle animation if animation button is enabled
  useEffect(() => {

  }, []);
  // animateDrop (in effects.js, which calls on procedures.js) will be passed down and called by discs after release to change gameState
  // const animateDrop = ((ref to disc), height, gameState?)

  // --- Positioning ---

  // spacing
  const space = 17 / (numTowers+1);

  // scale factors
  const scale = 1 + 1/20 * (7-numTowers);
  const coef = 60.75*scale*screenHeight/500;

  // offset from screen bottom 
  const bottom = screenHeight/10 - 10*(7-numTowers);
  // offset from screen left
  const leftSource = screenWidth/2 + coef*(-8.5 + 0.15 + space*(source+1));
  const leftDest = screenWidth/2 + coef*(-8.5 + 0.15 + space*(destination+1));

  window.onresize = () => {
    setScreenWidth(window.innerWidth);
    setScreenHeight(window.innerHeight);
  }

  // path to load texture maps
  const toUrl = (type) => `${process.env.PUBLIC_URL}/assets/textures/${texture}/${type}.png`;

  // display the discs and towers acoording to gameState
  return (
    <>
      <div className="content">
        <Canvas>
          <spotLight position={[30, -20, -20]} intensity={1} />
          <spotLight position={[-30, 20, 20]} intensity={1} />
          <spotLight position={[-50, -40, 20]} intensity={1} />
          <PerspectiveCamera makeDefault fov={45} aspect={0.3} position={[0,0,10]} near={1} far={20} />
          {/* initial Tower rendering */
            [...Array(numTowers)].map((_, index) =>
              <Tower
                key={index}
                position={[-8.5 + 0.4 + space*(index+1), -1, 0]} 
                scale={scale} 
                toUrl={toUrl}
                numDiscs={numDiscs}
              />
            )
          }
          {/* initial Disc rendering */
            // TODO: add dropDown animation
            initDiscs.map((size, index) => 
              <Disc
                key={index}
                gameState={gameState}
                position={[-8.5 + 0.4 + space*(source+1), -2 - numDiscs/14 + 0.4*(index+1), 0]}
                scale={scale}
                size={size}
                toUrl={toUrl}
                source={source}
              />
            )
          }
        </Canvas>
      </div>
      {/* labels source and destination tower */ }
      <div className="icon" style={{ color: "LightSeaGreen", bottom: bottom, left: leftSource}}>
        <FaChevronUp size={`${2*coef/60.75}em`}/>
      </div>   
      <div className="icon" style={{ color: "LightSeaGreen", bottom: bottom, left: leftDest}}>
        <FaChevronDown size={`${2*coef/60.75}em`}/>
      </div>
      <div>
        <h1>Procedure: {procedure}</h1> 
        <h1>Animate: {animate ? 1 : 0}</h1>
      </div>
    </>
  );
}

export default GameLogic;