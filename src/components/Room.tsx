import useSpline from '@splinetool/r3f-spline';
import { BakeShadows, Html, Point, useScroll } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import Pin from './Pin';
import useWindowSize from '@/utils/useWindowSize';
import { cameraState } from '@/utils/cameraState';
import { button, useControls } from 'leva';

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
  console.log('nodes', nodes);

  const width = useWindowSize();

  const shadowControls = useControls('shadows', {
    pointLight: true,
    pointLight2: true,
    spotLight: true,
    dirLight: true,
  });

  const pointLightControls = useControls('Point Light', {
    visible: true,
    position: {
      value: {
        x: nodes['Point Light'].position.x,
        y: nodes['Point Light'].position.y,
        z: nodes['Point Light'].position.z,
      },
      step: 1,
    },
    intensity: nodes['Point Light'].intensity,
    color: {
      value: {
        r: nodes['Point Light'].color.r * 255,
        g: nodes['Point Light'].color.g * 255,
        b: nodes['Point Light'].color.b * 255,
      },
    },
  });

  const pointLight2Controls = useControls('Point Light 2', {
    visible: true,
    position: {
      value: {
        x: nodes['Point Light 2'].position.x,
        y: nodes['Point Light 2'].position.y,
        z: nodes['Point Light 2'].position.z,
      },
      step: 1,
    },
    intensity: nodes['Point Light 2'].intensity,
    color: {
      value: {
        r: nodes['Point Light 2'].color.r * 255,
        g: nodes['Point Light 2'].color.g * 255,
        b: nodes['Point Light 2'].color.b * 255,
      },
    },
  });

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
    <>
      <group rotation-y={-Math.PI / 2}>
        <BakeShadows />
        <primitive object={nodes.group} />
        <primitive object={nodes['Default Ambient Light']} />
        <primitive
          object={nodes['Directional Light']}
          ref={directionalLight}
          castShadow={shadowControls.dirLight}
        />
        <primitive
          object={nodes['Point Light']}
          castShadow={shadowControls.pointLight}
          visible={pointLightControls.visible}
          position={[
            pointLightControls.position.x,
            pointLightControls.position.y,
            pointLightControls.position.z,
          ]}
          intensity={pointLightControls.intensity}
          color={`rgb(${pointLightControls.color.r},${pointLightControls.color.g},${pointLightControls.color.b})`}
        />
        <primitive
          object={nodes['Point Light 2']}
          castShadow={shadowControls.pointLight2}
          visible={pointLight2Controls.visible}
          position={[
            pointLight2Controls.position.x,
            pointLight2Controls.position.y,
            pointLight2Controls.position.z,
          ]}
          intensity={pointLight2Controls.intensity}
          color={`rgb(${pointLight2Controls.color.r},${pointLight2Controls.color.g},${pointLight2Controls.color.b})`}
        />
        <primitive
          object={nodes['Spot Light']}
          castShadow={shadowControls.spotLight}
        />

        <Pin position={[-65, 70, 20]} type='first' />
        <Pin position={[18, 78, -93]} type='second' />
        <Pin position={[-85, 105, -50]} type='third' />
      </group>
    </>
  );
}
