import useSpline from '@splinetool/r3f-spline';
import { BakeShadows } from '@react-three/drei';

export default function SplineScene() {
  const { nodes } = useSpline(
    'https://prod.spline.design/mCO5CWpmPD-hsfyN/scene.splinecode'
  );

  return (
    <>
      <group rotation={[0, -Math.PI / 2, 0]}>
        <BakeShadows />
        <primitive object={nodes.group} position={[0, Math.PI / 2, 0]} />
        <primitive object={nodes['Default Ambient Light']} />
        <primitive object={nodes['Directional Light']} />
        <primitive object={nodes['Point Light']} />
        <primitive object={nodes['Point Light 2']} />
        <primitive object={nodes['Spot Light']} />
      </group>
    </>
  );
}
