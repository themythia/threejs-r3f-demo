import { Scroll, useScroll } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useState } from 'react';
import Card from './Card';

export default function Slide() {
  const scrollHook = useScroll();
  const [page, setPage] = useState('first');

  useFrame(() => {
    if (scrollHook.offset <= 0.33) setPage('first');
    else if (scrollHook.offset > 0.33 && scrollHook.offset <= 0.66)
      setPage('second');
    else setPage('third');
  });

  return (
    <Scroll html>
      <div className='w-screen absolute z-10 flex flex-col h-[calc(200vh)]'>
        <Card type='first' visible={page === 'first'} />
        <Card type='second' visible={page === 'second'} />
        <Card type='third' visible={page === 'third'} />
      </div>
    </Scroll>
  );
}
