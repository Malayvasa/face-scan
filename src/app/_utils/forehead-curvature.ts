import type { FacePoint } from "./face-point";
import { distance3d } from "./distance-3d";
import { midpoint } from "./midpoint";
import { subtractPoints } from "./subtract-points";

/**
 * Forehead bow (sagitta) from the temple-to-temple chord up to the hairline.
 * Larger values mean a more rounded forehead.
 */
export function foreheadSagitta(
  leftTemple: FacePoint,
  hairline: FacePoint,
  rightTemple: FacePoint,
): number {
  const chord = subtractPoints(rightTemple, leftTemple);
  const chordLength = Math.hypot(chord.x, chord.y, chord.z);
  if (chordLength < 1e-9) return 0;

  const mid = midpoint(leftTemple, rightTemple);
  const toHairline = subtractPoints(hairline, mid);
  const projection =
    (toHairline.x * chord.x + toHairline.y * chord.y + toHairline.z * chord.z) /
    (chordLength * chordLength);
  const closest: FacePoint = {
    x: mid.x + chord.x * projection,
    y: mid.y + chord.y * projection,
    z: mid.z + chord.z * projection,
  };

  return distance3d(hairline, closest);
}
