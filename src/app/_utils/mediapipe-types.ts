import type { FacePoint } from "./face-point";

export type FaceLandmarkerRunningMode = "IMAGE" | "VIDEO";

export type FaceLandmarkerResult = {
  faceLandmarks: FacePoint[][];
};

export type FaceLandmarkerInstance = {
  detect: (
    image: HTMLImageElement | HTMLCanvasElement | ImageBitmap,
  ) => FaceLandmarkerResult;
  detectForVideo: (
    video: HTMLVideoElement,
    timestamp: number,
  ) => FaceLandmarkerResult;
  setOptions: (options: { runningMode: FaceLandmarkerRunningMode }) => Promise<void>;
  close: () => void;
};

export type VisionWasmFileset = {
  wasmLoaderPath: string;
  wasmBinaryPath: string;
};

export type TasksVisionModule = {
  FilesetResolver: {
    forVisionTasks: (wasmPath: string) => Promise<VisionWasmFileset>;
  };
  FaceLandmarker: {
    createFromOptions: (
      fileset: VisionWasmFileset,
      options: {
        baseOptions: {
          modelAssetPath: string;
          delegate?: "CPU" | "GPU";
        };
        runningMode: FaceLandmarkerRunningMode;
        numFaces: number;
        outputFacialTransformationMatrixes?: boolean;
      },
    ) => Promise<FaceLandmarkerInstance>;
  };
};
