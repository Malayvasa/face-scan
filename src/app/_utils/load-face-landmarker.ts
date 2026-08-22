import { importTasksVision } from "./import-tasks-vision";
import type {
  FaceLandmarkerInstance,
  TasksVisionModule,
  VisionWasmFileset,
} from "./mediapipe-types";

const WASM_PATH =
  "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.22/wasm";
const MODEL_PATH =
  "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task";

export async function loadFaceLandmarker(
  runningMode: "IMAGE" | "VIDEO",
): Promise<FaceLandmarkerInstance> {
  const vision = await importTasksVision();
  const fileset = await vision.FilesetResolver.forVisionTasks(WASM_PATH);
  try {
    return await createLandmarker(vision, fileset, runningMode, "GPU");
  } catch {
    return createLandmarker(vision, fileset, runningMode, "CPU");
  }
}

function createLandmarker(
  vision: TasksVisionModule,
  fileset: VisionWasmFileset,
  runningMode: "IMAGE" | "VIDEO",
  delegate: "CPU" | "GPU",
) {
  return vision.FaceLandmarker.createFromOptions(fileset, {
    baseOptions: {
      modelAssetPath: MODEL_PATH,
      delegate,
    },
    runningMode,
    numFaces: 1,
    outputFacialTransformationMatrixes: false,
  });
}
