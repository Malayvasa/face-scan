import type { FacePoint } from "./face-point";

export function midpoint(a: FacePoint, b: FacePoint): FacePoint {
  return {
    x: (a.x + b.x) / 2,
    y: (a.y + b.y) / 2,
    z: (a.z + b.z) / 2,
  };
}
