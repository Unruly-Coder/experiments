"use client";

import {DefaultScene} from "@/components/DefaultScene";


import * as THREE from "three";
import {useFrame} from "@react-three/fiber";
import { SoftShadows, useGLTF } from "@react-three/drei";

export default function Page() {
  
  return (
    <DefaultScene cameraPosition={[0, 2, 7]}>
      <SoftShadows samples={25} size={20} focus={0}/>
      <Myself/>
      <mesh position={[0, 0, -0.5]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow={true}>
        <planeGeometry args={[3.2, 5]}/>
        <shadowMaterial transparent opacity={0.5}/>
      </mesh>
      <mesh position={[0, 0, -0.5]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow={true}>
        <planeGeometry args={[3.2, 5]}/>
        <meshBasicMaterial color={'#535353'}/>
      </mesh>
      <ambientLight intensity={0.5}/>
      <directionalLight castShadow position={[2.5, 8, 5]} intensity={2.5} shadow-mapSize={1024}>
        <orthographicCamera attach="shadow-camera" args={[-10, 10, -10, 10, 0.1, 50]}/>
      </directionalLight>
      <directionalLight position={[0, 1, -1]} intensity={2}/>
      <directionalLight position={[-1, 1, 0]} intensity={2}/>
      <directionalLight position={[0, -1, 0]} intensity={1}/>
    </DefaultScene>
  );
}

function Myself() {
  const {scene, animations} = useGLTF('/assets/models/pawel.glb');
  
  scene.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      child.castShadow = true;
    }
  });

  const mixer = new THREE.AnimationMixer(scene);
  void mixer.clipAction(animations[0]).play();


  useFrame((state, delta) => {
    mixer.update(delta);
  });


  return (
    <primitive object={scene}/>
  )
}