import { Html } from '@react-three/drei';
import { Vector3, useThree } from '@react-three/fiber';

interface PinProps {
  position: Vector3;
}
export default function Pin({ position }: PinProps) {
  const { gl } = useThree();
  return (
    <mesh position={position} scale={0.001}>
      <boxBufferGeometry />
      <meshBasicMaterial />
      {gl?.domElement?.parentNode && (
        <Html
          portal={{ current: gl.domElement.parentNode as HTMLElement }}
          zIndexRange={[1, 0]}
        >
          <div className='bg-[#094EFF]/60 rounded-full w-[104px] h-[104px] md:w-52 md:h-52 flex justify-center items-center relative'>
            <div className='bg-white rounded-full w-5 h-5 md:w-10 md:h-10'></div>
          </div>
        </Html>
      )}
    </mesh>
  );
}
