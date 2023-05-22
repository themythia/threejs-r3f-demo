import useSpline from '@splinetool/r3f-spline';
import { BakeShadows, useScroll } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import { Vector3 } from 'three';
import { useEffect, useState } from 'react';
import { useControls } from 'leva';

export default function SplineScene() {
  const [page, setPage] = useState<string>('third');
  const { nodes } = useSpline(
    'https://prod.spline.design/mCO5CWpmPD-hsfyN/scene.splinecode'
  );

  const state = useThree();
  const scroll = useScroll();

  const { position, rotation, zoom } = useControls('cube', {
    position: {
      value: { x: 100, y: 3, z: -150 },
      step: 1,
    },
    rotation: {
      value: { x: Math.PI / 24, y: -Math.PI / 2, z: 0 },
      step: 0.01,
    },
    zoom: {
      value: 7.5,
      step: 0.1,
    },
  });

  console.log('state', state);
  useFrame(() => {
    if (scroll.offset > 0.66) setPage('third');
    else if (scroll.offset > 0.33) setPage('second');
    else setPage('first');

    state.camera.zoom = zoom;
    state.camera.updateProjectionMatrix();
  });

  const modelState = {
    first: {
      rotation: {
        x: Math.PI / 24,
        y: -Math.PI / 2,
        z: 0,
      },
      position: { x: 100, y: 3, z: -150 },
      zoom: 7.5,
    },
    second: {
      rotation: {
        x: Math.PI / 24,
        y: -Math.PI / 12,
        z: 0,
      },
      position: { x: -80, y: 0, z: -100 },
      zoom: 7.5,
    },
    third: {
      rotation: {
        x: 0.59,
        y: -2.08,
        z: 0,
      },
      position: { x: -40, y: -55, z: 0 },
      zoom: 12.4,
    },
  };

  return (
    <>
      <group
        rotation={[
          modelState[page].rotation.x,
          modelState[page].rotation.y,
          modelState[page].rotation.z,
        ]}
        position={[
          modelState[page].position.x,
          modelState[page].position.y,
          modelState[page].position.z,
        ]}
      >
        <BakeShadows />
        <primitive object={nodes.group} position={[0, Math.PI / 2, 0]} />
        <primitive object={nodes['Default Ambient Light']} />
        <primitive object={nodes['Directional Light']} />
        <primitive object={nodes['Point Light']} />
        <primitive object={nodes['Point Light 2']} />
        <primitive object={nodes['Spot Light']} />
      </group>
    </>
  );
}
