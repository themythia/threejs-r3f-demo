import { useControls } from 'leva';
import { useRef } from 'react';

interface SpotLightProps {
  object: THREE.SpotLight;
}

export default function SpotLight({ object }: SpotLightProps) {
  const spotLight = useRef<THREE.SpotLight>(null);
  const spotLightcontrols = useControls('spotLight', {
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
    angle: object.angle,
    penumbra: object.penumbra,
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
    spotLight: true,
  });

  return (
    <>
      <primitive
        object={object}
        castShadow={shadowControls.spotLight}
        visible={spotLightcontrols.visible}
        position={[
          spotLightcontrols.position.x,
          spotLightcontrols.position.y,
          spotLightcontrols.position.z,
        ]}
        intensity={spotLightcontrols.intensity}
        color={`rgb(${spotLightcontrols.color.r},${spotLightcontrols.color.g},${spotLightcontrols.color.b})`}
        decay={spotLightcontrols.decay}
        distance={spotLightcontrols.distance}
        angle={spotLightcontrols.angle}
        penumbra={spotLightcontrols.penumbra}
        ref={spotLight}
      />

      {spotLight.current && spotLightcontrols.showHelper && (
        <spotLightHelper
          args={[
            spotLight.current,
            `rgb(${spotLightcontrols.color.r},${spotLightcontrols.color.g},${spotLightcontrols.color.b})`,
          ]}
        />
      )}
    </>
  );
}
