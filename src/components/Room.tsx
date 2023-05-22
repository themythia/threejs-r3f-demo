import useSpline from '@splinetool/r3f-spline';
import { useScroll } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import { useState } from 'react';
import * as THREE from 'three';

export default function SplineScene() {
  const [page, setPage] = useState<string>('third');
  const [rotationX, setRotationX] = useState(Math.PI / 24);
  const [rotationY, setRotationY] = useState(-Math.PI / 2);
  const [rotationZ, setRotationZ] = useState(0);
  const [positionX, setPositionX] = useState(100);
  const [positionY, setPositionY] = useState(3);
  const [positionZ, setPositionZ] = useState(-150);

  const { nodes } = useSpline(
    'https://prod.spline.design/mCO5CWpmPD-hsfyN/scene.splinecode'
  );
  const scroll = useScroll();
  const state = useThree();

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

  useFrame(() => {
    const handleLerp = (x: number, y: number): number => {
      if (page !== 'first') {
        return THREE.MathUtils.lerp(x, y, (scroll.offset - 0.5) / 0.5);
      }
      return THREE.MathUtils.lerp(x, y, scroll.offset / 0.5);
    };

    if (scroll.offset >= 0.99) setPage('third');
    else if (scroll.offset > 0.5) setPage('second');
    else setPage('first');

    if (page === 'first') {
      const rX = handleLerp(
        modelState.first.rotation.x,
        modelState.second.rotation.x
      );
      const rY = handleLerp(
        modelState.first.rotation.y,
        modelState.second.rotation.y
      );

      const rZ = handleLerp(
        modelState.first.rotation.z,
        modelState.second.rotation.z
      );

      const pX = handleLerp(
        modelState.first.position.x,
        modelState.second.position.x
      );
      const pY = handleLerp(
        modelState.first.position.y,
        modelState.second.position.y
      );

      const pZ = handleLerp(
        modelState.first.position.z,
        modelState.second.position.z
      );

      setRotationX(rX);
      setRotationY(rY);
      setRotationZ(rZ);

      setPositionX(pX);
      setPositionY(pY);
      setPositionZ(pZ);
    } else if (page === 'second') {
      const rX = handleLerp(
        modelState.second.rotation.x,
        modelState.third.rotation.x
      );
      const rY = handleLerp(
        modelState.second.rotation.y,
        modelState.third.rotation.y
      );

      const rZ = handleLerp(
        modelState.second.rotation.z,
        modelState.third.rotation.z
      );

      const pX = handleLerp(
        modelState.second.position.x,
        modelState.third.position.x
      );
      const pY = handleLerp(
        modelState.second.position.y,
        modelState.third.position.y
      );

      const pZ = handleLerp(
        modelState.second.position.z,
        modelState.third.position.z
      );

      const newZoom = handleLerp(modelState.second.zoom, modelState.third.zoom);

      setRotationX(rX);
      setRotationY(rY);
      setRotationZ(rZ);

      setPositionX(pX);
      setPositionY(pY);
      setPositionZ(pZ);

      state.camera.zoom = newZoom;
      state.camera.updateProjectionMatrix();
    }
  });

  return (
    <>
      <group
        rotation={[rotationX, rotationY, rotationZ]}
        position={[positionX, positionY, positionZ]}
      >
        {/* <BakeShadows /> */}
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
