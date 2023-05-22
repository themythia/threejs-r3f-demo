import { Canvas } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';
import SplineScene from '@/components/SplineScene';
import { useControls } from 'leva';
import { Perf } from 'r3f-perf';

export default function Home() {
  const { position } = useControls('camera', {
    position: {
      value: { x: -100, y: -10, z: 150 },
      step: 1,
    },
  });
  return (
    <main className={`w-full h-screen`}>
      <Canvas shadows flat linear>
        <Perf position='top-left' />
        <color attach='background' args={['#ffdc5f']} />
        <PerspectiveCamera
          makeDefault
          position={[position.x, position.y, position.z]}
          rotation={[0, 0, 0]}
          fov={45}
        />
        <SplineScene />
      </Canvas>
    </main>
  );
}
