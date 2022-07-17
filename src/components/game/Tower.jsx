import React from "react";
import { useTexture } from "@react-three/drei";

// Tower component to be rendered and used in GameLogic
const Tower = ({ position, scale, texture}) => {
  // converts to absolute url
  const toUrl = (type) => `${process.env.PUBLIC_URL}/assets/textures/${texture}/${type}.png`;
  
  // loading texture maps
  const textureProps = useTexture({
    map: toUrl("map"),
    aoMap: toUrl("ao"),
    metalnessMap: toUrl("metallic"),
    normalMap: toUrl("normal"),
    roughnessMap: toUrl("roughness")
  });

  return (
    <group scale={scale}>
      <mesh position={position}>
        <cylinderBufferGeometry args={[0.15, 0.15, 2.4]} />
        <meshStandardMaterial {...textureProps} roughness={1} attach="material" />
      </mesh>
      <mesh position={position.map((x,i) => i === 1 ? x-1.2 : x)}>
        <cylinderBufferGeometry args={[0.9, 1, 0.2, 12]} />
        <meshStandardMaterial {...textureProps} roughness={1} attach="material" />
      </mesh>
    </group>
  );
}

export default Tower;