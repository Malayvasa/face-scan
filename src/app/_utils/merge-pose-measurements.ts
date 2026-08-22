import { MEASUREMENT_DEFS } from "./measurement-defs";
import type { FaceMeasurement } from "./measure-face";
import { poseForMeasurement } from "./pose-for-measurement";
import type { ScanPose } from "./scan-pose";

export function mergePoseMeasurements(
  byPose: Partial<Record<ScanPose, readonly FaceMeasurement[]>>,
): FaceMeasurement[] {
  return MEASUREMENT_DEFS.map((def) => {
    const pose = poseForMeasurement(def.id);
    const match = byPose[pose]?.find((item) => item.id === def.id);
    return (
      match ?? {
        id: def.id,
        label: def.label,
        description: def.description,
        unit: def.unit,
        group: def.group,
        markers: def.markers,
        value: Number.NaN,
      }
    );
  });
}
