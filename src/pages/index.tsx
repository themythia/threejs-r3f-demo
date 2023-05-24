import { Canvas } from '@react-three/fiber';
import { Perf } from 'r3f-perf';
import Scene from '@/components/Scene';
import Logo from '@/components/Logo';

export default function Home() {
  return (
    <main className={`w-full h-screen`}>
      <Logo />
      <Canvas flat linear>
        <Perf position='bottom-left' />
        <Scene />
      </Canvas>
    </main>
  );
}
