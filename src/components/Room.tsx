import useSpline from '@splinetool/r3f-spline';
import { BakeShadows, Html, Point, useScroll } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import Pin from './Pin';
import useWindowSize from '@/utils/useWindowSize';

export default function SplineScene() {
  const [page, setPage] = useState<string>('first');
  const directionalLight = useRef<THREE.DirectionalLight>();
  const scroll = useScroll();
  const state = useThree();

  const { nodes } = useSpline(
    'https://prod.spline.design/mCO5CWpmPD-hsfyN/scene.splinecode'
  );

  interface IValue {
    rotation: {
      x: number;
      y: number;
      z: number;
    };
    position: {
      x: number;
      y: number;
      z: number;
    };
    zoom: number;
  }
  type CameraStateType = Record<
    string,
    { first: IValue; second: IValue; third: IValue }
  >;

  const cameraState: CameraStateType = {
    desktop: {
      first: {
        rotation: {
          x: -0.108,
          y: 0.018,
          z: 0.002,
        },
        position: { x: -57.401, y: 76.103, z: 131.121 },
        zoom: 12.526,
      },
      second: {
        rotation: {
          x: -0.569,
          y: -1.296,
          z: -0.551,
        },
        position: { x: -92.09, y: 77.086, z: 81.542 },
        zoom: 14.862,
      },
      third: {
        rotation: {
          x: -0.944,
          y: 0.466,
          z: 0.556,
        },
        position: { x: 145.38, y: 260.129, z: 21.044 },
        zoom: 24.822,
      },
    },
    mobile: {
      first: {
        rotation: {
          x: -0.253,
          y: -0.057,
          z: -0.014,
        },
        position: { x: -15.066, y: 30.844, z: 85.564 },
        zoom: 4,
      },
      second: {
        rotation: {
          x: -0.726,
          y: -1.125,
          z: -0.676,
        },
        position: { x: -53.957, y: 38.595, z: 61.758 },
        zoom: 4.5,
      },
      third: {
        rotation: {
          x: -1.016,
          y: 0.251,
          z: 0.382,
        },
        position: { x: 76.299, y: 141.336, z: -36.072 },
        zoom: 7,
      },
    },
  };

  const width = useWindowSize();

  useFrame(() => {
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
    <>
      <group rotation-y={-Math.PI / 2}>
        <BakeShadows />
        <primitive object={nodes.group} />
        <primitive object={nodes['Default Ambient Light']} />
        <primitive object={nodes['Directional Light']} ref={directionalLight} />
        <primitive object={nodes['Point Light']} />
        <primitive object={nodes['Point Light 2']} />
        <primitive object={nodes['Spot Light']} />

        <Pin position={[-65, 70, 20]} type='first' />
        <Pin position={[18, 78, -93]} type='second' />
        <Pin position={[-85, 105, -50]} type='third' />
      </group>
    </>
  );
}
