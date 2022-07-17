import React , { useState, useRef, useEffect } from "react";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";
import useSound from "use-sound";
import { Canvas } from "@react-three/fiber";
import Disc from "./game/Disc";
import Tower from "./game/Tower";
import { PerspectiveCamera } from "@react-three/drei";

const GameLogic = ({ procedure, numTowers, numDiscs, source, destination, texture, animate }) => {
  // gameState contains an object with an whose elements represent individual tower states and a rank counter (number of discs)
  // tower states will be maintained as an array, similating stack, of Disc references
  // maintain an array of both towers and discs
  // call alert whenever gameState is about to be reset (perhaps insider the function call to reset())
  const [gameState, setGameState] = useState([]);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [screenHeight, setScreenHeight] = useState(window.innerHeight);
  const [click] = useSound(process.env.PUBLIC_URL + "/assets/sounds/click.mp3");
  const numRenders = useRef(0);

  // click sound effect played upon sidebar state change
  useEffect(() => {numRenders.current++ < 3 || click()}, 
    [procedure, numTowers, numDiscs, source, destination, texture, animate, click]);

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

  // spacing
  const space = 18 / (numTowers+1);

  // scale factors
  const scale = 1 + 1/15 * (7-numTowers);
  const coef = 60.75*scale*screenHeight/500;

  // offset from screen bottom 
  const bottom = screenHeight/10 - 10*scale;
  // offset from screen left
  const leftSource = screenWidth/2 + coef*(-9 + 0.15 + space*(source+1));
  const leftDest = screenWidth/2 + coef*(-9 + 0.15 + space*(destination+1));

  console.log(window.innerHeight);
  console.log(leftSource);
  console.log(leftDest);

  window.onresize = () => {
    setScreenWidth(window.innerWidth);
    setScreenHeight(window.innerHeight);
  }
  
  // display the discs and towers agreeing with gameState
  return (
    <>
      <div className="content">
        <Canvas>
          <spotLight position={[30, -20, -20]} />
          <spotLight position={[-30, 20, 20]} />
          <spotLight position={[-50, -40, 20]} />
          <PerspectiveCamera makeDefault fov={45} aspect={0.3} position={[0,0,10]} near={1} far={20} />
          {/* scale is dependent on numTowers */
            [...Array(numTowers)].map((_, index) =>
              <Tower 
                key={index}
                position={[-9 + 0.4 + space*(index+1), -0.8, 0]} 
                scale={scale} 
                texture={texture}
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
        <h1>{procedure}</h1> 
        <h1>{numTowers}</h1>
        <h1>{numDiscs}</h1>
        <h1>{source}</h1>
        <h1>{destination}</h1>
        <h1>{animate ? 1 : 0}</h1>
      </div>
    </>
  );
}

export default GameLogic;