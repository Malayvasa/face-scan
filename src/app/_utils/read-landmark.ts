import { ORIGIN_POINT, type FacePoint } from "./face-point";

export function readLandmark(
  landmarks: readonly FacePoint[],
  index: number,
): FacePoint {
  return landmarks[index] ?? ORIGIN_POINT;
}
