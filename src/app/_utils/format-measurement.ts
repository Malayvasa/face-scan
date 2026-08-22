import type { MeasurementUnit } from "./measurement-id";

export function formatMeasurement(
  value: number,
  unit: MeasurementUnit,
): string {
  if (!Number.isFinite(value)) return "—";
  const rounded = value.toFixed(1);
  return unit === "deg" ? `${rounded}°` : `${rounded} mm`;
}
