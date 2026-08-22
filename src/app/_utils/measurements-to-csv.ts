import { formatMeasurement } from "./format-measurement";
import type { FaceMeasurement } from "./measure-face";

export function measurementsToCsv(measurements: readonly FaceMeasurement[]): string {
  const header = "Measurement,Value,Unit,Formatted";
  const rows = measurements.map((item) => {
    const formatted = formatMeasurement(item.value, item.unit);
    return [item.label, item.value.toFixed(2), item.unit, formatted]
      .map(csvCell)
      .join(",");
  });
  return [header, ...rows].join("\n");
}

function csvCell(value: string): string {
  if (!/[",\n]/.test(value)) return value;
  return `"${value.replaceAll('"', '""')}"`;
}
