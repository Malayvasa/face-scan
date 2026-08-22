import { distance2d } from "./distance-2d";
import type { FacePoint } from "./face-point";
import type { ScalePoints } from "./object-scale";

export type ScaleHandle = "a" | "b";

const HIT_RADIUS = 0.04;

export function hitTestScale(
  point: FacePoint,
  scale: ScalePoints,
): ScaleHandle | null {
  const distA = distance2d(point, scale.a);
  const distB = distance2d(point, scale.b);
  if (distA > HIT_RADIUS && distB > HIT_RADIUS) return null;
  if (distA <= distB) return "a";
  return "b";
}
