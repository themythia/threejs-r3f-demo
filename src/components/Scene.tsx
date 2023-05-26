import {
  CameraControls,
  OrthographicCamera,
  ScrollControls,
} from '@react-three/drei';
import Room from './Room';
import Slide from './Slide';
import useWindowSize from '@/utils/useWindowSize';
import { useMemo } from 'react';
import { useControls } from 'leva';

export default function Scene() {
  const width = useWindowSize();
  const handleDirection = useMemo(() => {
    if (!width) return false;
    if (width < 768) return true;
    return false;
  }, [width]);

  const { showOrbitControls } = useControls('Orbit Controls', {
    showOrbitControls: false,
  });

  return (
    <ScrollControls
      pages={2}
      damping={0.1}
      distance={2}
      horizontal={handleDirection}
    >
      <OrthographicCamera
        zoom={7.5}
        position-z={300}
        makeDefault={!showOrbitControls}
      />
      <Room showOrbitControls={showOrbitControls} />
      <Slide />
      {showOrbitControls && <CameraControls makeDefault />}
      <axesHelper args={[500]} />
    </ScrollControls>
  );
}
