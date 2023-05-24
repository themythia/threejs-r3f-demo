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
          <div className='bg-[#094EFF]/70 rounded-full w-52 h-52 flex justify-center items-center relative'>
            <div className='bg-white rounded-full w-10 h-10'></div>
          </div>
        </Html>
      )}
    </mesh>
  );
}
