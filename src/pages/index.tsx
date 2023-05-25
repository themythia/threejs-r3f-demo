import { Canvas } from '@react-three/fiber';
import Scene from '@/components/Scene';
import Logo from '@/components/Logo';
import { Leva } from 'leva';

export default function Home() {
  return (
    <main className='w-full h-screen bg-[#ffdc5f]'>
      <Leva hidden />
      <Logo />
      <Canvas flat linear>
        <Scene />
      </Canvas>
    </main>
  );
}
