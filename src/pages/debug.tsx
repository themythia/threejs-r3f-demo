import { Canvas } from '@react-three/fiber';
import { Perf } from 'r3f-perf';
import Scene from '@/components/Scene';
import Logo from '@/components/Logo';
import { Leva, useControls } from 'leva';

export default function Home() {
  const { position, visible } = useControls('Performance Overlay', {
    position: {
      options: ['top-left', 'top-right', 'bottom-left', 'bottom-right'],
    },
    visible: true,
  });

  return (
    <main className='w-full h-screen bg-[#ffdc5f]'>
      <Leva collapsed />
      <Logo />
      <Canvas flat linear shadows>
        {visible && <Perf position={position} />}
        <Scene />
      </Canvas>
    </main>
  );
}
