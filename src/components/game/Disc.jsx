import React, { useState, useRef } from "react";
import { useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from 'three';

const Disc = ({ gameState, source, position, scale, size, toUrl }) => {
  // index in gamerState that current disc is in 
  const [index, setIndex] = useState(source);

  // test
  const mesh = useRef();
  useFrame(() => {mesh.current.rotation.x = Math.PI / 2;})

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
  circle.moveTo( 0, size );
  circle.quadraticCurveTo( size, size, size, 0 );
	circle.quadraticCurveTo( size, -size, 0, -size );
	circle.quadraticCurveTo( -size, -size, -size, 0 );
  circle.quadraticCurveTo( -size, size, 0, size );

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
    <group scale={scale}>
      <mesh ref={mesh} position={position}>
        <extrudeBufferGeometry args={[circle, extrudeSettings]} />
        <meshPhysicalMaterial {...textureProps} color={"LightCyan"} attach="material" />
      </mesh>
    </group>
  );
}

export default Disc;