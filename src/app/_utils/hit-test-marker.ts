import { distance2d } from "./distance-2d";
import type { MarkerMap } from "./extract-markers";
import type { MarkerId } from "./marker-id";
import type { FacePoint } from "./face-point";
import { VISIBLE_MARKER_IDS } from "./visible-marker-ids";

const HIT_RADIUS = 0.028;

export function hitTestMarker(
  point: FacePoint,
  markers: MarkerMap,
): MarkerId | null {
  return VISIBLE_MARKER_IDS.reduce<MarkerId | null>((best, id) => {
    const marker = markers[id];
    const distance = distance2d(point, marker);
    if (distance > HIT_RADIUS) return best;
    if (!best) return id;
    return distance < distance2d(point, markers[best]) ? id : best;
  }, null);
}
