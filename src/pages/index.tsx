import { Canvas } from '@react-three/fiber';
import { Perf } from 'r3f-perf';
import Scene from '@/components/Scene';
import Slide from '@/components/Slide';
import { useEffect, useRef, useState } from 'react';

export default function Home() {
  return (
    <main className={`w-full h-screen`}>
      <Canvas flat linear>
        <Perf position='bottom-left' />
        <Scene />
      </Canvas>
    </main>
  );
}
