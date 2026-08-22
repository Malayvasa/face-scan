import { MEASUREMENT_DEFS } from "./measurement-defs";
import type { FaceMeasurement } from "./measure-face";

export function emptyMeasurements(): FaceMeasurement[] {
  return MEASUREMENT_DEFS.map((def) => ({
    id: def.id,
    label: def.label,
    description: def.description,
    unit: def.unit,
    group: def.group,
    markers: def.markers,
    value: Number.NaN,
  }));
}
