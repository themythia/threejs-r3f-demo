import { Canvas } from '@react-three/fiber';
import { Perf } from 'r3f-perf';
import Scene from '@/components/Scene';
import Logo from '@/components/Logo';
import { useEffect, useState } from 'react';

export default function Home() {
  return (
    <main className='w-full h-screen bg-[#ffdc5f]'>
      <Logo />
      <Canvas flat linear>
        <Perf position='bottom-left' />
        <Scene />
      </Canvas>
    </main>
  );
}
