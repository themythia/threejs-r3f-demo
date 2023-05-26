import useSpline from '@splinetool/r3f-spline';
import { BakeShadows, useScroll } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import Pin from './Pin';
import useWindowSize from '@/utils/useWindowSize';
import { cameraState } from '@/utils/cameraState';
import PointLight from './PointLight';
import HemisphereLight from './HemisphereLight';
import DirectionalLight from './DirectionalLight';
import SpotLight from './SpotLight';

export default function SplineScene({
  showOrbitControls,
}: {
  showOrbitControls: boolean;
}) {
  const [page, setPage] = useState<string>('first');
  const directionalLight = useRef<THREE.DirectionalLight>();
  const scroll = useScroll();
  const state = useThree();

  const { nodes } = useSpline(
    'https://prod.spline.design/mCO5CWpmPD-hsfyN/scene.splinecode'
  );

  const width = useWindowSize();

  useFrame(() => {
    if (showOrbitControls) return;

    const handleScreen = () => {
      if (!width) return 'desktop';
      if (width >= 768) return 'desktop';
      else return 'mobile';
    };
    const handleLerp = (x: number, y: number): number => {
      if (page !== 'first') {
        return THREE.MathUtils.lerp(x, y, (scroll.offset - 0.5) / 0.5);
      }
      return THREE.MathUtils.lerp(x, y, scroll.offset / 0.5);
    };

    const handleFirst = () => {
      const screen = handleScreen();
      const { first, second } = cameraState[screen];
      return {
        rx: handleLerp(first.rotation.x, second.rotation.x),
        ry: handleLerp(first.rotation.y, second.rotation.y),
        rz: handleLerp(first.rotation.z, second.rotation.z),
        px: handleLerp(first.position.x, second.position.x),
        py: handleLerp(first.position.y, second.position.y),
        pz: handleLerp(first.position.z, second.position.z),
        zoom: handleLerp(first.zoom, second.zoom),
      };
    };

    const handleSecond = () => {
      const screen = handleScreen();
      const { third, second } = cameraState[screen];
      return {
        rx: handleLerp(second.rotation.x, third.rotation.x),
        ry: handleLerp(second.rotation.y, third.rotation.y),
        rz: handleLerp(second.rotation.z, third.rotation.z),
        px: handleLerp(second.position.x, third.position.x),
        py: handleLerp(second.position.y, third.position.y),
        pz: handleLerp(second.position.z, third.position.z),
        zoom: handleLerp(second.zoom, third.zoom),
      };
    };

    const handleCamera = (values: Record<string, number>) => {
      const { rx, ry, rz, px, py, pz, zoom } = values;
      state.camera.position.set(px, py, pz);
      state.camera.rotation.set(rx, ry, rz);
      state.camera.zoom = zoom;
      state.camera.updateProjectionMatrix();
    };

    if (scroll.offset >= 0.99) setPage('third');
    else if (scroll.offset > 0.5) setPage('second');
    else setPage('first');

    if (page === 'first') {
      const values = handleFirst();
      handleCamera(values);
    } else if (page === 'second') {
      const values = handleSecond();
      handleCamera(values);
    }
  });

  useEffect(() => {
    if (directionalLight && directionalLight.current) {
      directionalLight.current.shadow.camera.near = 200;
      directionalLight.current.shadow.camera.far = 520;
      directionalLight.current.shadow.camera.top = 50;
      directionalLight.current.shadow.camera.bottom = -200;
      directionalLight.current.shadow.camera.left = -300;
      directionalLight.current.shadow.camera.right = 50;
    }
  }, []);

  return (
    <group rotation={[0, -Math.PI / 2, 0]}>
      <BakeShadows />
      <primitive object={nodes.group} />
      <HemisphereLight object={nodes['Default Ambient Light']} />
      <DirectionalLight object={nodes['Directional Light']} />
      <PointLight object={nodes['Point Light']} name='pointLight' />
      <PointLight object={nodes['Point Light 2']} name='pointLight2' />
      <SpotLight object={nodes['Spot Light']} />

      <Pin position={[-65, 70, 20]} type='first' />
      <Pin position={[18, 78, -93]} type='second' />
      <Pin position={[-85, 105, -50]} type='third' />
    </group>
  );
}
