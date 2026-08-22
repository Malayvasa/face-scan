import type { FacePoint } from "./face-point";

export function subtractPoints(a: FacePoint, b: FacePoint): FacePoint {
  return {
    x: a.x - b.x,
    y: a.y - b.y,
    z: a.z - b.z,
  };
}
