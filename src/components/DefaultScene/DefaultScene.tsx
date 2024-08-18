import {Grid} from "@/components/Grid";
import {OrbitControls} from "@react-three/drei";
import {Canvas} from "@react-three/fiber";

interface Props {
  children?: React.ReactNode;
}
export function DefaultScene({children}: Props) {
  return (
    <Canvas shadows camera={{ position: [4, 3, 6], fov: 25 }}>
      {children}
      <Grid/>
      <OrbitControls makeDefault/>
</Canvas>
  );
}