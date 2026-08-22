import { formatMeasurement } from "./format-measurement";
import type { FaceMeasurement } from "./measure-face";

export function measurementsToText(
  measurements: readonly FaceMeasurement[],
): string {
  return measurements
    .map((item) => `${item.label}: ${formatMeasurement(item.value, item.unit)}`)
    .join("\n");
}
