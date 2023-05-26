import { useFrame } from '@react-three/fiber';
import { useControls } from 'leva';
import { useRef } from 'react';
import { HemisphereLightHelper } from 'three';

interface HemisphereLightProps {
  object: THREE.HemisphereLight;
}

export default function HemisphereLight({ object }: HemisphereLightProps) {
  const hemisphereLight = useRef<THREE.HemisphereLight>(null);
  const helper = useRef<HemisphereLightHelper>(null);

  useFrame(() => {
    if (helper && helper.current && hemisphereLightControls.showHelper) {
      helper.current.update();
    }
  });

  const hemisphereLightControls = useControls('ambientHemisphereLight', {
    visible: true,
    position: {
      value: {
        x: object.position.x,
        y: object.position.y,
        z: object.position.z,
      },
      step: 1,
    },
    intensity: object.intensity,
    groundColor: {
      value: {
        r: object.groundColor.r * 255,
        g: object.groundColor.g * 255,
        b: object.groundColor.b * 255,
      },
    },
    skyColor: {
      value: {
        r: object.color.r * 255,
        g: object.color.g * 255,
        b: object.color.b * 255,
      },
    },
    showHelper: false,
  });

  return (
    <>
      <primitive
        object={object}
        ref={hemisphereLight}
        visible={hemisphereLightControls.visible}
        position={[
          hemisphereLightControls.position.x,
          hemisphereLightControls.position.y,
          hemisphereLightControls.position.z,
        ]}
        color={`rgb(${hemisphereLightControls.skyColor.r},${hemisphereLightControls.skyColor.g},${hemisphereLightControls.skyColor.b})`}
        groundColor={`rgb(${hemisphereLightControls.groundColor.r},${hemisphereLightControls.groundColor.g},${hemisphereLightControls.groundColor.b})`}
        intensity={hemisphereLightControls.intensity}
      />

      {hemisphereLight.current && hemisphereLightControls.showHelper && (
        <hemisphereLightHelper
          args={[hemisphereLight.current, 10]}
          ref={helper}
        />
      )}
    </>
  );
}
