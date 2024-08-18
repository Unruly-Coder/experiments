"use client";
import * as THREE from 'three';
import vertexShader from './shaders/vertex.glsl';

import fragmentShader from './shaders/fragment.glsl';
import {useFrame, useLoader} from "@react-three/fiber";
import {useMemo, useRef} from "react";
import {useControls} from "leva";

export default function Experience() {

  const material = useRef<THREE.ShaderMaterial>(null);
  const flag = useLoader(THREE.TextureLoader, '/assets/three-js-journey/Flag_of_Poland.png');

  const controls = useControls('Flag', {
    frequencyX: { value: 9, min: 0, max: 20, step: 1 },
    frequencyY: { value: 3, min: 0, max: 20, step: 1 }
  });

  useFrame(({clock}) => {
    const elapsedTime = clock.getElapsedTime();

    if(material.current) {
      material.current.uniforms.uTime.value = elapsedTime;
      material.current.uniforms.uFrequency.value.x = controls.frequencyX;
      material.current.uniforms.uFrequency.value.y = controls.frequencyY;
    }
  });

  const uniforms = useMemo(() => ({
    uFrequency: { value: new THREE.Vector2(controls.frequencyX, controls.frequencyY) },
    uTime: { value: 0 },
    uTexture: { value: flag }
    //eslint-disable-next-line
  }), []);

  return (
    <mesh position={[0, 0.5, 0]} scale={[1, 2/3, 1]}>
      <planeGeometry args={[1, 1, 50, 50]}/>
      <shaderMaterial
        ref={material}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        side={THREE.DoubleSide}
        uniforms={uniforms}
      />
    </mesh>
  );
}