import { computeMeasurement } from "./compute-measurement";
import type { MarkerMap } from "./extract-markers";
import { MEASUREMENT_DEFS, type MeasurementDef } from "./measurement-defs";

export type FaceMeasurement = {
  id: MeasurementDef["id"];
  label: string;
  description: string;
  unit: MeasurementDef["unit"];
  group: MeasurementDef["group"];
  markers: MeasurementDef["markers"];
  value: number;
};

export function measureFace(
  markers: MarkerMap,
  mmPerUnit: number,
): FaceMeasurement[] {
  return MEASUREMENT_DEFS.map((def) => ({
    id: def.id,
    label: def.label,
    description: def.description,
    unit: def.unit,
    group: def.group,
    markers: def.markers,
    value: computeMeasurement(def.id, markers, mmPerUnit),
  }));
}
