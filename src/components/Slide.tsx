import { Html, Scroll, useScroll } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useEffect, useState } from 'react';
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

  useEffect(() => {
    if (scrollHook && scrollHook.el) {
      scrollHook.el.style.zIndex = '20';
    }
  }, []);

  return (
    <Scroll html>
      <div className='isolate w-screen absolute z-50 flex flex-col h-[calc(200vh)]'>
        <Card type='first' visible={page === 'first'} />
        <Card type='second' visible={page === 'second'} />
        <Card type='third' visible={page === 'third'} />
      </div>
    </Scroll>
  );
}
