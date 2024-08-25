import {Grid} from "@/components/Grid";
import {OrbitControls} from "@react-three/drei";
import {Canvas} from "@react-three/fiber";


interface Props {
  children?: React.ReactNode;
  cameraPosition?: [number, number, number];
}
export function DefaultScene({children, cameraPosition = [4,3,6]}: Props) {
  return (
    <>
    <Canvas shadows camera={{ position: cameraPosition, fov: 25}}>
        {children}
        <Grid/>
        <OrbitControls makeDefault target={[0,1,0]}/>
    </Canvas>
    </>
  );
}