import {
  CameraControls,
  OrthographicCamera,
  ScrollControls,
} from '@react-three/drei';
import Room from './Room';
import Slide from './Slide';
import Pin from './Pin';

export default function Scene() {
  return (
    <ScrollControls pages={2} damping={0.1} distance={2}>
      {/* <color attach='background' args={['#ffdc5f']} /> */}
      <OrthographicCamera zoom={7.5} position-z={300} makeDefault />
      <Room />
      <Slide />
      {/* <CameraControls makeDefault /> */}
    </ScrollControls>
  );
}
