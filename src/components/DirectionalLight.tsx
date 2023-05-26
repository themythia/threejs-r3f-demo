import { useControls } from 'leva';
import { useEffect, useRef } from 'react';

interface DirectionalLightProps {
  object: THREE.DirectionalLight;
}

export default function DirectionalLight({ object }: DirectionalLightProps) {
  const directionalLight = useRef<THREE.DirectionalLight>(null);
  const directionalLightControls = useControls('directionalLight', {
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
    directionalLight: true,
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
      <primitive
        object={object}
        castShadow={shadowControls.directionalLight}
        visible={directionalLightControls.visible}
        position={[
          directionalLightControls.position.x,
          directionalLightControls.position.y,
          directionalLightControls.position.z,
        ]}
        intensity={directionalLightControls.intensity}
        color={`rgb(${directionalLightControls.color.r},${directionalLightControls.color.g},${directionalLightControls.color.b})`}
        ref={directionalLight}
      />

      {directionalLight.current && directionalLightControls.showHelper && (
        <directionalLightHelper
          args={[
            directionalLight.current,
            10,
            `rgb(${directionalLightControls.color.r},${directionalLightControls.color.g},${directionalLightControls.color.b})`,
          ]}
        />
      )}
    </>
  );
}
