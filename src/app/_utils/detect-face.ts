import type { FacePoint } from "./face-point";
import type { FaceLandmarkerInstance } from "./mediapipe-types";

export function detectFaceFromVideo(
  landmarker: FaceLandmarkerInstance,
  video: HTMLVideoElement,
  timestampMs: number,
): FacePoint[] | null {
  const result = landmarker.detectForVideo(video, timestampMs);
  return result.faceLandmarks[0] ?? null;
}
