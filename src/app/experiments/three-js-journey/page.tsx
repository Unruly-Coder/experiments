"use client";

import {Grid} from "@/components/Grid";
import {Canvas} from "@react-three/fiber";
import {OrbitControls} from "@react-three/drei";

export default function Page() {
  return (
    <Canvas shadows camera={{ position: [8, 7, 10], fov: 25 }}>
      <mesh position={[0, 1, 0]}>
        <planeGeometry args={[2, 2, 13, 13]}/>
      </mesh>
      <Grid/>
      <OrbitControls makeDefault autoRotate autoRotateSpeed={0.5}/>
    </Canvas>
  );
}