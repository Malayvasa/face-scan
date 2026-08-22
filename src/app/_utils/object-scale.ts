import { distance2d } from "./distance-2d";
import type { FacePoint } from "./face-point";

/** ISO/IEC 7810 ID-1 (credit, debit, and most ID cards). */
export const CREDIT_CARD_LONG_EDGE_MM = 85.6;
export const CREDIT_CARD_SHORT_EDGE_MM = 54;

export type ScalePoints = {
  a: FacePoint;
  b: FacePoint;
};

export type ScaleDraft = {
  a: FacePoint | null;
  b: FacePoint | null;
};

export function completeScalePoints(draft: ScaleDraft): ScalePoints | null {
  if (!draft.a || !draft.b) return null;
  return { a: draft.a, b: draft.b };
}

export function millimetersPerUnit(
  points: ScalePoints,
  knownLengthMm: number,
): number {
  const units = distance2d(points.a, points.b);
  if (units < 0.002) return 0;
  return knownLengthMm / units;
}
