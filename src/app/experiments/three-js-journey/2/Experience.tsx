"use client";

import * as THREE from 'three';
import vertexShader from './shaders/vertex.glsl';
import fragmentShader from './shaders/fragment.glsl';
import {useFrame} from "@react-three/fiber";
import {useMemo, useRef} from "react";
import {useControls} from "leva";

export default function Experience() {

  const material = useRef<THREE.ShaderMaterial>(null);

  const controls = useControls('Water', {
    bigWavesElevation: { value: 0.1, min: 0.1, max: 1, step: 0.1 },
    bigWavesFrequencyX: { value: 4, min: 0, max: 10, step: 0.001 },
    bigWavesFrequencyY: { value: 1.5, min: 0, max: 10, step: 0.001 },
    bigWaveSpeed: { value: 0.75, min: 0, max: 4, step: 0.01 },

    smallWavesElevation: { value: 0.1, min: 0.1, max: 1, step: 0.1 },
    smallWavesFrequencyX: { value: 2, min: 0, max: 10, step: 0.001 },
    smallWavesFrequencyY: { value: 2, min: 0, max: 10, step: 0.001 },
    smallWaveSpeed: { value: 0.75, min: 0, max: 4, step: 0.01 },
    smallWavesIterations: { value: 4, min: 0, max: 5, step: 1 },
    
    depthColor: '#186691',
    surfaceColor: '#9bd8ff',
    colorOffset: { value: 0.4, min: 0, max: 1, step: 0.01 },
    colorMultiplier: { value: 1.2, min: 0, max: 5, step: 0.01 },
    
    wireframe: { value: false }
  });

  useFrame(({clock}) => {
    const elapsedTime = clock.getElapsedTime();

    if(material.current) {
      material.current.uniforms.uTime.value = elapsedTime;
      material.current.uniforms.uBigWavesElevation.value = controls.bigWavesElevation;
      material.current.uniforms.uBigWavesFrequency.value.x = controls.bigWavesFrequencyX;
      material.current.uniforms.uBigWavesFrequency.value.y = controls.bigWavesFrequencyY;
      material.current.uniforms.uBigWavesSpeed.value = controls.bigWaveSpeed;
      
      material.current.uniforms.uSmallWavesElevation.value = controls.smallWavesElevation;
      material.current.uniforms.uSmallWavesFrequency.value.x = controls.smallWavesFrequencyX;
      material.current.uniforms.uSmallWavesFrequency.value.y = controls.smallWavesFrequencyY;
      material.current.uniforms.uSmallWavesSpeed.value = controls.smallWaveSpeed;
      material.current.uniforms.uSmallWavesIterations.value = controls.smallWavesIterations;
      
      material.current.uniforms.uDepthColor.value.set(controls.depthColor);
      material.current.uniforms.uSurfaceColor.value.set(controls.surfaceColor);
      material.current.uniforms.uColorOffset.value = controls.colorOffset;
      material.current.uniforms.uColorMultiplier.value = controls.colorMultiplier;

    }
  });

  const uniforms = useMemo(() => ({
    uBigWavesElevation: { value: controls.bigWavesElevation },
    uBigWavesFrequency: { value: new THREE.Vector2(controls.bigWavesFrequencyX, controls.bigWavesFrequencyY) },
    uBigWavesSpeed: { value: controls.bigWaveSpeed },
    
    uSmallWavesElevation: { value: controls.smallWavesElevation },
    uSmallWavesFrequency: { value: new THREE.Vector2(controls.smallWavesFrequencyX, controls.smallWavesFrequencyY) },
    uSmallWavesSpeed: { value: controls.smallWaveSpeed },
    uSmallWavesIterations: { value: controls.smallWavesIterations },
    
    uTime: { value: 0 },
    uDepthColor: { value: new THREE.Color(controls.depthColor) },
    uSurfaceColor: { value: new THREE.Color(controls.surfaceColor) },
    uColorOffset: { value: controls.colorOffset},
    uColorMultiplier: { value: controls.colorMultiplier },
  //eslint-disable-next-line
  }), []);

  return (
    <mesh position={[0, 0.5, 0]} rotation={[Math.PI / 2, 0, 0]}>
      <planeGeometry args={[3, 3, 256, 256]}/>
      <shaderMaterial
        ref={material}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        side={THREE.DoubleSide}
        uniforms={uniforms}
        wireframe={controls.wireframe}
      />
    </mesh>
  );
}