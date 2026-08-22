import { ORIGIN_POINT, type FacePoint } from "./face-point";
import type { MarkerMap } from "./extract-markers";
import { MARKER_IDS, type MarkerId } from "./marker-id";

export function testMarkers(
  overrides: Partial<Record<MarkerId, FacePoint>>,
): MarkerMap {
  const blank = Object.fromEntries(
    MARKER_IDS.map((id) => [id, ORIGIN_POINT]),
  ) as MarkerMap;
  return { ...blank, ...overrides };
}
