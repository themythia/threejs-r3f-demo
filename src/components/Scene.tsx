import { OrthographicCamera, ScrollControls } from '@react-three/drei';
import Room from './Room';

export default function Scene() {
  return (
    <ScrollControls pages={2} damping={0.1}>
      <color attach='background' args={['#ffdc5f']} />
      <OrthographicCamera makeDefault zoom={7.5} position-z={300} />
      <Room />
    </ScrollControls>
  );
}
