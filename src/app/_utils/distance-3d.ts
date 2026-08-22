import type { FacePoint } from "./face-point";
import { subtractPoints } from "./subtract-points";

export function distance3d(a: FacePoint, b: FacePoint): number {
  const delta = subtractPoints(a, b);
  return Math.hypot(delta.x, delta.y, delta.z);
}
