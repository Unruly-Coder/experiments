"use client";

import {Canvas, MeshProps} from "@react-three/fiber";
import {Grid} from "@/components/Grid";
import {Center, Environment, OrbitControls,  useGLTF} from "@react-three/drei";
import {Mesh} from "three";

export default function Home() {
  
  return (
    <Canvas shadows camera={{ position: [8, 7, 10], fov: 25 }}>
      <Experience/>
    </Canvas>
  );
}

function Experience() {

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
  
  return (<>
    <Center top>
    <Suzi rotation={[-0.63, 0, 0]} scale={2} />
  </Center>
    <OrbitControls makeDefault autoRotate={true} autoRotateSpeed={0.5}/>
    <Grid/>
    <Environment preset="city" /></>);
}

function Suzi(props: MeshProps) {
  const { nodes } = useGLTF('https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/suzanne-high-poly/model.gltf')
  const model = nodes.Suzanne as Mesh;
  
  return (
    <mesh castShadow receiveShadow geometry={model.geometry} {...props}>
      <meshStandardMaterial color="#9d4b4b" />
    </mesh>
  )
}
