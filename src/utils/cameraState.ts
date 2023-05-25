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

export const cameraState: CameraStateType = {
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
