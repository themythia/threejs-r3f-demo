import { Scroll, useScroll } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';

export default function Slide() {
  const scrollHook = useScroll();
  const first = useRef<HTMLDivElement>(null);
  const second = useRef<HTMLDivElement>(null);
  const third = useRef<HTMLDivElement>(null);

  useFrame(() => {
    if (first.current && second.current && third.current) {
      if (scrollHook.offset > 0.33) first.current.style.opacity = '0';
      else if (scrollHook.offset <= 0.33) {
        first.current.style.opacity = '1';
        second.current.style.opacity = '0';
        third.current.style.opacity = '0';
      }
      if (scrollHook.offset > 0.66) second.current.style.opacity = '0';
      else if (scrollHook.offset >= 0.33) second.current.style.opacity = '1';

      if (scrollHook.offset >= 0.66) third.current.style.opacity = '1';
      else if (scrollHook.offset < 0.66) third.current.style.opacity = '0';
    }
  });

  return (
    <Scroll html>
      {/* DOM contents in here will scroll along */}
      <div className='w-screen absolute z-10 flex flex-col h-[calc(200vh)]'>
        <div
          className='flex flex-col gap-y-7 w-1/2 relative left-0 px-40 top-[calc(33vh)] opacity-0 transition-all duration-500'
          ref={first}
        >
          <h1 className='font-bold text-[83px]'>Your setup</h1>
          <p className='text-2xl'>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Illo optio
            in atque ducimus, repellat repudiandae maxime autem deserunt
            expedita eaque dicta, architecto fuga at! Placeat explicabo saepe
            dolorum eius et.
          </p>
        </div>
        <div
          className='flex flex-col gap-y-7 w-1/2 relative right-0 left-1/2 px-40 top-[calc(50vh)] opacity-0 transition-all duration-500'
          ref={second}
        >
          <h1 className='font-bold text-[83px]'>Your setup 2 </h1>
          <p className='text-2xl'>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Illo optio
            in atque ducimus, repellat repudiandae maxime autem deserunt
            expedita eaque dicta, architecto fuga at! Placeat explicabo saepe
            dolorum eius et.
          </p>
        </div>
        <div
          className='flex flex-col gap-y-7 w-1/2 relative right-0 left-1/2 px-40 top-[calc(75vh)] opacity-0 transition-all duration-500'
          ref={third}
        >
          <h1 className='font-bold text-[83px]'>Your setup 3</h1>
          <p className='text-2xl'>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Illo optio
            in atque ducimus, repellat repudiandae maxime autem deserunt
            expedita eaque dicta, architecto fuga at! Placeat explicabo saepe
            dolorum eius et.
          </p>
        </div>
      </div>
    </Scroll>
  );
}
