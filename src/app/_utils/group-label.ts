import type { MeasurementGroup } from "./measurement-id";

export function groupLabel(group: MeasurementGroup): string {
  switch (group) {
    case "left-profile":
      return "Left profile";
    case "left-eye":
      return "Left eye & brow";
    case "center":
      return "Center";
    case "right-eye":
      return "Right eye & brow";
    case "right-profile":
      return "Right profile";
  }
}
