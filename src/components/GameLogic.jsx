import React, { useState, useRef, useEffect } from "react";
import useSound from "use-sound";
import { Canvas } from "@react-three/fiber";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";
import { PerspectiveCamera } from "@react-three/drei";
import { winCondition } from "../helpers/procedures";
import Disc from "./game/Disc";
import Tower from "./game/Tower";

const GameLogic = ({ procedure, numTowers, numDiscs, source, destination, texture, animate }) => {
  // gameState is an array whose elements represent individual tower states
  // maintained as an array, similating stack, of Disc sizes (unique identifier)
  const [gameState, setGameState] = useState([]);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [screenHeight, setScreenHeight] = useState(window.innerHeight);
  const path = `${process.env.PUBLIC_URL}/assets/sounds/`;
  const [click] = useSound(`${path}click.mp3`);
  const [winSound] = useSound(`${path}win.mp3`);
  const [sound] = useSound(`${path}${texture}.mp3`);
  const numRenders = useRef(0);

  // resets gameState
  useEffect(() => {
    // initial disc state (ordered least to small)
    const initDiscs = [...Array(numDiscs)].map((_, index) => 0.7-0.38*index/(numDiscs-1));
    // initial game state
    const initGameState = [...Array(numTowers)].map((_, index) => 
      index === source ? initDiscs : 
      (
        // bicolor procedure check
        procedure === 1 && 
        (source < numTowers-1 ? index === source+1 : index === numTowers-2)
      )
      ? initDiscs.map(x => x-0.001) : []
    );
    // TODO dropDown animation
    setGameState(initGameState);
  }, [numDiscs, source, numTowers, procedure]);

  // click sound effect played upon sidebar state change
  useEffect(() => {numRenders.current++ < 3 || click()}, 
    [procedure, texture, animate, click]);

  // check for winning state in gameState after gameState mutation
  useEffect(() => {
    // TODO: import from Modal.jsx
    const winModal = () => {

    }
    winCondition(procedure, numDiscs, gameState[source], gameState[destination]) ? 
      winSound() && winModal() : sound();
  }, [gameState, numDiscs, destination]);

  // solution animation
  useEffect(() => {
    // will need to input args, possible: gameState, source, destination, procedure
    // animation will be in effects.js, which calls on procedures.js for checks and solution algorithm
    // if animate, call play() with args of current gameState, else call pause()
    // animate ? play() : pause()
    // calling pause will bring disc back to original position before leave
  }, [animate]);

  // Don't forget to return removeEventListener if needed
  useEffect(() => {

  }, []);

  // --- Positioning ---

  // spacing
  const space = 17 / (numTowers+1);

  // returns x-coordinate relative to Canvas
  const width = (start, index) => start + space*(index+1);

  // scale factors
  const scale = 1 + 1/20 * (7-numTowers);
  const coef = 60.75*scale*screenHeight/500;

  // offset from screen bottom 
  const bottom = screenHeight/10 - 10*(7-numTowers);
  // offset from screen left
  const leftSource = screenWidth/2 + coef*width(-8.35, source);
  const leftDest = screenWidth/2 + coef*width(-8.35, destination);

  // window resize event listener
  window.onresize = () => {
    setScreenWidth(window.innerWidth);
    setScreenHeight(window.innerHeight);
  }

  // --- methods passed as Disc props ---

  // gameState mutation (called by Disc components)
  const changeGameState = (from, to) => {
    // identity
    const newState = gameState.map(x => x);
    const radius = newState[from].pop();
    newState[to].push(radius);
    setGameState(newState);
  }

  // path to load texture maps
  const toUrl = (type) => `${process.env.PUBLIC_URL}/assets/textures/${texture}/${type}.png`;

  // display the discs and towers acoording to gameState
  return (
    <>
      <div className="content">
        <Canvas>
          <spotLight position={[30, -20, -20]} intensity={0.8}/>
          <spotLight position={[-30, 20, 20]} intensity={0.8} />
          <spotLight position={[-50, -40, 20]} intensity={0.8} />
          <spotLight position={[50, 40, 20]} intensity={0.8} />          
          <PerspectiveCamera makeDefault fov={45} aspect={0.5} position={[0,0,10]} near={1} far={20} />
          <group scale={scale}>
            {/* initial Tower rendering */
              [...Array(numTowers)].map((_, index) =>
                <Tower
                  key={index}
                  position={[width(-8.1, index), -1, 0]} 
                  toUrl={toUrl}
                  numDiscs={numDiscs}
                />
              )
            }
          </group>
          {/* Disc rendering (dependent on gameState) */
            // TODO: add dropDown animation
            gameState.map((tower, towerIndex) => 
              <group key={towerIndex} scale={scale}>
                {tower.map((radius, discIndex) => 
                  <Disc
                    key={radius}
                    gameState={gameState}
                    changeGameState={changeGameState}
                    scale={scale}
                    numDiscs={numDiscs}
                    space={space}
                    towerIndex={towerIndex}
                    position={[width(-8.1, towerIndex), -2 - numDiscs/14 + 0.4*(discIndex+1), 0]}
                    radius={radius}
                    toUrl={toUrl}
                    procedure={procedure}
                  />
                )}
              </group>
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
        <h4>{JSON.stringify(gameState)}</h4>
      </div>
    </>
  );
}

export default GameLogic;