import React from "react";

const Tower = ({ position, scale }) => {
  
  return (
    <group scale={scale}>
      <mesh position={position}>
        <cylinderBufferGeometry args={[0.1, 0.1, 2.4]} />
        <meshStandardMaterial color="RoyalBlue" attach="material" />
      </mesh>
      <mesh position={position.map((x,i) => i === 1 ? x-1.2 : x)}>
        <cylinderBufferGeometry args={[0.8, 0.9, 0.2, 12]} />
        <meshStandardMaterial color="RoyalBlue" attach="material" />
      </mesh>
    </group>
  );
}

export default Tower;