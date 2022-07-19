import React from "react";
import * as THREE from 'three';
import { useTexture } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { useGesture } from "@use-gesture/react";
import { useSpring, a } from "@react-spring/three";
import { isValidMove } from "../../helpers/procedures";

const Disc = ({ gameState, changeGameState, height, space, towerIndex, position, radius, toUrl, procedure }) => {
  // current tower state
  const towerState = gameState[towerIndex];
  // is this the topmost disc?
  const isTop = towerState === undefined ? false : towerState.at(-1) === radius;
  const { size, viewport } = useThree();
  const aspect = size.width / viewport.width * 1.2;

  const [spring, set] = useSpring(() => 
    ({ 
      position: position, 
      rotation: [Math.PI/2, 0, 0], 
      reset: true, 
      config: { friction: 30, mass: radius**2} 
    })
  );

  const bind = useGesture({
    onDrag: ({ movement: [mx, my] }) => {
      // scale
      mx /= aspect;
      my /= aspect;
      // translation
      mx += position[0]
      my -= position[1]
      // is topmost disc in tower?
      isTop && -my <= height && set({ position: [position[0], Math.max(-my, position[1]), 0] });
      // rotation within tower
      const withRotation = () => set({ rotation: [Math.PI/2, 0, -mx / radius**3 / 5] });
      // only topmost disc out of tower has no rotation
      isTop && -my > height && isTop ? set({ position: [mx, -my, 0] }) : withRotation();
    },
  });

  // potential gameState mutation
  const handlePointerUp = () => {
    let pos = JSON.stringify(spring.position);
    pos = pos.substring(1, pos.length-1);
    pos = pos.split(",");
    // use x-coordinate to determine closest tower
    const x = parseInt(pos[0]);
    const offset = 8.1
    const to = Math.round((x+offset) / space) - 1;
    const invalid = () => {
      // TODO: try to directing end pointer event
      changeGameState(towerIndex, towerIndex);
    }
    isValidMove(procedure, gameState, towerIndex, to) ?
      changeGameState(towerIndex, to) :
      invalid();
  };

  // loading texture maps
  const textureProps = useTexture({
    map: toUrl("map"),
    aoMap: toUrl("ao"),
    metalnessMap: toUrl("metallic"),
    normalMap: toUrl("normal"),
    roughnessMap: toUrl("roughness")
  });

  // setting up circular shape
  const circle = new THREE.Shape();
  circle.moveTo( 0, radius );
  circle.quadraticCurveTo( radius, radius, radius, 0 );
	circle.quadraticCurveTo( radius, -radius, 0, -radius );
	circle.quadraticCurveTo( -radius, -radius, -radius, 0 );
  circle.quadraticCurveTo( -radius, radius, 0, radius );

  // hole
  let hole = new THREE.Path();
  hole.arc(0, 0, 0.32);
  circle.holes.push(hole);

  // extrude props
  const extrudeSettings = {
    steps: 50,
    depth: 0.2,
    bevelEnabled: true,
    bevelThickness: 0.1,
	  bevelSize: 0.1,
	  bevelOffset: 0.05,
	  bevelSegments: 7
  };

	return (
    <a.mesh {...spring} {...bind()} onPointerUp={handlePointerUp}>
      <extrudeBufferGeometry args={[circle, extrudeSettings]} />
      <meshPhysicalMaterial 
        {...textureProps} 
        color={procedure <= 1 ? "LightCyan" : "White"} 
        attach="material" 
      />
    </a.mesh>
  );
}

export default Disc;