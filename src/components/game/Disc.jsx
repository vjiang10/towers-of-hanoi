import React, { useState, useRef } from "react";
import { useFrame } from "@react-three/fiber";

const Disc = ({ position, scale }) => {
  // this reference will give us direct access to the mesh
  const mesh = useRef();

  // set up state for the hover state
  const [hover, setHover] = useState(false);
  useFrame(() => {mesh.current.rotation.x += 0.01; mesh.current.rotation.y += 0.05})

	return (
    <mesh 
      ref={mesh}
      position={position}
      scale={scale}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
    >
      <boxBufferGeometry args={[1,1,1]} attach="geometry" />
      <meshStandardMaterial color={hover ? 'hotpink' : 'orange'} attach="material" />
    </mesh>
  );
}

export default Disc;