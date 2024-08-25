"use client";

import {DefaultScene} from "@/components/DefaultScene";


import * as THREE from "three";
import {useFrame} from "@react-three/fiber";
import { SoftShadows, useGLTF } from "@react-three/drei";
import {MeshPhysicalMaterial} from "three";
import {useEffect} from "react";
import {useControls} from "leva";


export default function Page() {

 
  return (
    <DefaultScene cameraPosition={[0, 3, 7]}>
      <SoftShadows samples={25} size={20} focus={0}/>
      <Myself/>
      <mesh position={[0, 0.1, 0]} receiveShadow={true}>
        <cylinderGeometry args={[2.2, 2.2, 0.2, 50]} />
        <meshStandardMaterial color={'#5e5e5e'}/>
      </mesh>

      <directionalLight castShadow position={[2.5, 8, 5]} intensity={2.5} shadow-mapSize={1024}>
        <orthographicCamera attach="shadow-camera" args={[-10, 10, -10, 10, 0.1, 50]}/>
      </directionalLight>
      <directionalLight position={[0, 1, -1]} intensity={2} />
      <directionalLight position={[-1, 1, 0]} intensity={2} />
      <directionalLight position={[0, -1, 0]} intensity={1.5} />
    </DefaultScene>
  );
}

function Myself() {
  const {scene, animations, materials} = useGLTF('/assets/models/pawel.glb');

  useEffect(() => {
    scene.position.y = 0.2
    scene.traverse((child) => {
      if (child.isObject3D) {
        child.castShadow = true;

      }
    });
  }, [scene]);
  
  const controls = useControls('Model', {
    animate: false
    
  })


  const mixer = new THREE.AnimationMixer(scene);
  const animation = mixer.clipAction(animations[0]);
 
  animation.play()


  useFrame((state, delta) => {
    if(controls.animate) {
      mixer.update(delta);
    }

  });


  return (
    <primitive object={scene}/>
  )
}