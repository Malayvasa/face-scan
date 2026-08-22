import type { FacePoint } from "./face-point";
import { subtractPoints } from "./subtract-points";

/** Interior angle at `vertex` formed by points `from` → vertex → `to`, in degrees. */
export function angleDegrees(
  vertex: FacePoint,
  from: FacePoint,
  to: FacePoint,
): number {
  const u = subtractPoints(from, vertex);
  const v = subtractPoints(to, vertex);
  const denom = Math.hypot(u.x, u.y, u.z) * Math.hypot(v.x, v.y, v.z);
  if (denom < 1e-9) return 0;
  const cos = (u.x * v.x + u.y * v.y + u.z * v.z) / denom;
  return (Math.acos(Math.min(1, Math.max(-1, cos))) * 180) / Math.PI;
}
