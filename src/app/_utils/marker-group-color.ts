import type { CanvasTheme } from "./read-canvas-theme";
import type { MarkerId } from "./marker-id";

export function markerGroupColor(
  id: MarkerId,
  theme: CanvasTheme,
): string {
  if (id.startsWith("leftEar") || id === "leftTemple" || id === "leftGonion") {
    return theme.chart1;
  }
  if (id.startsWith("leftEye") || id.startsWith("leftBrow") || id === "leftNostril") {
    return theme.chart2;
  }
  if (id.startsWith("rightEye") || id.startsWith("rightBrow") || id === "rightNostril") {
    return theme.chart4;
  }
  if (
    id.startsWith("rightEar") ||
    id === "rightTemple" ||
    id === "rightGonion"
  ) {
    return theme.chart5;
  }
  return theme.chart3;
}
