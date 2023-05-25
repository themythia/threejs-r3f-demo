import { Html } from '@react-three/drei';
import { Vector3, useThree } from '@react-three/fiber';
import { useRef } from 'react';
import { useControls } from 'leva';

interface PinProps {
  position: Vector3;
  type: 'first' | 'second' | 'third';
}
export default function Pin({ position, type }: PinProps) {
  const { gl } = useThree();
  const pin = useRef<HTMLDivElement>(null);

  const handleHover = (type: 'enter' | 'leave') => {
    if (pin && pin.current) {
      pin.current.style.backgroundColor =
        type === 'enter' ? '#094EFF' : '#094fff99';
    }
  };

  const { showMesh } = useControls('Pins', {
    showMesh: false,
  });

  return (
    <mesh
      position={position}
      scale={type === 'third' ? 5 : 9}
      onPointerOver={() => handleHover('enter')}
      onPointerLeave={() => handleHover('leave')}
      visible={showMesh}
    >
      <sphereBufferGeometry />
      <meshBasicMaterial />
      {gl?.domElement?.parentNode && (
        <Html
          portal={{ current: gl.domElement.parentNode as HTMLElement }}
          zIndexRange={[1, 0]}
          position={[0, 0, 0]}
          style={{ pointerEvents: 'none' }}
        >
          <div
            className={
              'bg-[#094EFF]/60 rounded-full w-[104px] h-[104px] md:w-52 md:h-52 flex justify-center items-center relative md:right-24 md:bottom-24'
            }
            ref={pin}
          >
            <div className='bg-white rounded-full w-5 h-5 md:w-10 md:h-10'></div>
          </div>
        </Html>
      )}
    </mesh>
  );
}
