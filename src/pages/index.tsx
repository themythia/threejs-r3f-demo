import { Canvas } from '@react-three/fiber';
import { Perf } from 'r3f-perf';
import Scene from '@/components/Scene';

export default function Home() {
  return (
    <main className={`w-full h-screen`}>
      <Canvas flat linear>
        <Perf position='top-left' />
        <Scene />
      </Canvas>
    </main>
  );
}
