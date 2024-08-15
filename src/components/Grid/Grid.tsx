"use client";

import { Grid as R3FGrid} from "@react-three/drei";
export function Grid() {
  const gridSize: [number, number] = [10.5, 10.5];
  const gridConfig = {
    cellSize: 0.6 ,
    cellThickness:  1,
    cellColor: '#6f6f6f',
    sectionSize:  3.3,
    sectionThickness:  1.5,
    sectionColor: '#9d4b4b',
    fadeDistance:  25,
    fadeStrength:  1,
    followCamera: false,
    infiniteGrid: true
  }
  
  return (<R3FGrid position={[0, -0.01, 0]} args={gridSize} {...gridConfig} />)
}