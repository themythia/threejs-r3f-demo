import { useFrame } from '@react-three/fiber';
import { useControls } from 'leva';
import { useRef } from 'react';
import { PointLightHelper } from 'three';

interface PointLightProps {
  object: THREE.PointLight;
  name: string;
}

export default function PointLight({ object, name }: PointLightProps) {
  const pointLight = useRef<THREE.PointLight>(null);
  const helper = useRef<PointLightHelper>(null);

  useFrame(() => {
    if (helper && helper.current && pointLightControls.showHelper) {
      helper.current.update();
    }
  });

  const pointLightControls = useControls(name, {
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
    distance: object.distance,
    decay: object.decay,
    color: {
      value: {
        r: object.color.r * 255,
        g: object.color.g * 255,
        b: object.color.b * 255,
      },
    },
    showHelper: false,
  });

  const shadowControls = useControls('shadows', {
    [name]: true,
  });

  return (
    <>
      <primitive
        object={object}
        castShadow={shadowControls[name]}
        visible={pointLightControls.visible}
        position={[
          pointLightControls.position.x,
          pointLightControls.position.y,
          pointLightControls.position.z,
        ]}
        intensity={pointLightControls.intensity}
        color={`rgb(${pointLightControls.color.r},${pointLightControls.color.g},${pointLightControls.color.b})`}
        decay={pointLightControls.decay}
        distance={pointLightControls.distance}
        ref={pointLight}
      />

      {pointLight.current && pointLightControls.showHelper && (
        <pointLightHelper
          ref={helper}
          args={[
            pointLight.current,
            10,
            `rgb(${pointLightControls.color.r},${pointLightControls.color.g},${pointLightControls.color.b})`,
          ]}
        />
      )}
    </>
  );
}
