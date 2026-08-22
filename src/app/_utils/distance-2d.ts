import type { FacePoint } from "./face-point";

export function distance2d(a: FacePoint, b: FacePoint): number {
  return Math.hypot(a.x - b.x, a.y - b.y);
}
