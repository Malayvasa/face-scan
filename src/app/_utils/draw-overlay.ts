import type { FacePoint } from "./face-point";
import type { MarkerMap } from "./extract-markers";
import { LANDMARK } from "./landmark-index";
import type { MarkerId } from "./marker-id";
import { markerGroupColor } from "./marker-group-color";
import { readLandmark } from "./read-landmark";
import type { ScalePoints } from "./object-scale";
import type { CanvasTheme } from "./read-canvas-theme";
import { VISIBLE_MARKER_IDS } from "./visible-marker-ids";

export type OverlaySelection = {
  markers: readonly MarkerId[];
};

export function drawOverlay(
  ctx: CanvasRenderingContext2D,
  landmarks: readonly FacePoint[],
  markers: MarkerMap | null,
  theme: CanvasTheme,
  selection: OverlaySelection | null,
  showAllLandmarks: boolean,
  scale: ScalePoints | null,
): void {
  const { width, height } = ctx.canvas;
  ctx.clearRect(0, 0, width, height);

  if (landmarks.length > 0) {
    drawFaceOval(ctx, landmarks, width, height, theme.muted);
  }

  if (showAllLandmarks) {
    landmarks.forEach((point) => {
      drawDot(ctx, point, width, height, theme.muted, 1.4);
    });
  }

  if (selection && markers) {
    drawSelection(ctx, markers, selection.markers, width, height, theme.primary);
  }

  if (markers) {
    VISIBLE_MARKER_IDS.forEach((id, index) => {
      const point = markers[id];
      const selected = selection?.markers.includes(id) ?? false;
      const color = selected ? theme.primary : markerGroupColor(id, theme);
      drawMarker(ctx, point, width, height, color, theme.foreground, index + 1, selected);
    });
  }

  if (scale) {
    drawScale(ctx, scale, width, height, theme.warning, theme.foreground);
  }
}

function drawFaceOval(
  ctx: CanvasRenderingContext2D,
  landmarks: readonly FacePoint[],
  width: number,
  height: number,
  color: string,
): void {
  const first = readLandmark(landmarks, LANDMARK.faceOval[0] ?? 10);
  ctx.beginPath();
  ctx.moveTo(first.x * width, first.y * height);
  LANDMARK.faceOval.slice(1).forEach((index) => {
    const point = readLandmark(landmarks, index);
    ctx.lineTo(point.x * width, point.y * height);
  });
  ctx.closePath();
  ctx.strokeStyle = color;
  ctx.globalAlpha = 0.35;
  ctx.lineWidth = 1.5;
  ctx.stroke();
  ctx.globalAlpha = 1;
}

function drawSelection(
  ctx: CanvasRenderingContext2D,
  markers: MarkerMap,
  ids: readonly MarkerId[],
  width: number,
  height: number,
  color: string,
): void {
  if (ids.length < 2) return;
  ctx.beginPath();
  const first = markers[ids[0] ?? "chin"];
  ctx.moveTo(first.x * width, first.y * height);
  ids.slice(1).forEach((id) => {
    const point = markers[id];
    ctx.lineTo(point.x * width, point.y * height);
  });
  ctx.strokeStyle = color;
  ctx.lineWidth = 2.5;
  ctx.stroke();
}

function drawMarker(
  ctx: CanvasRenderingContext2D,
  point: FacePoint,
  width: number,
  height: number,
  color: string,
  labelColor: string,
  index: number,
  selected: boolean,
): void {
  const x = point.x * width;
  const y = point.y * height;
  const radius = selected ? 8 : 5.5;
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.fillStyle = color;
  ctx.fill();
  ctx.lineWidth = 1.5;
  ctx.strokeStyle = labelColor;
  ctx.stroke();

  ctx.font = "600 9px var(--font-abc-diatype), ui-sans-serif, system-ui";
  ctx.fillStyle = labelColor;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(String(index), x, y);
}

function drawDot(
  ctx: CanvasRenderingContext2D,
  point: FacePoint,
  width: number,
  height: number,
  color: string,
  radius: number,
): void {
  ctx.beginPath();
  ctx.arc(point.x * width, point.y * height, radius, 0, Math.PI * 2);
  ctx.fillStyle = color;
  ctx.globalAlpha = 0.45;
  ctx.fill();
  ctx.globalAlpha = 1;
}

function drawScale(
  ctx: CanvasRenderingContext2D,
  scale: ScalePoints,
  width: number,
  height: number,
  color: string,
  labelColor: string,
): void {
  ctx.beginPath();
  ctx.moveTo(scale.a.x * width, scale.a.y * height);
  ctx.lineTo(scale.b.x * width, scale.b.y * height);
  ctx.strokeStyle = color;
  ctx.lineWidth = 3;
  ctx.stroke();
  drawScaleHandle(ctx, scale.a, width, height, color, labelColor, "A");
  drawScaleHandle(ctx, scale.b, width, height, color, labelColor, "B");
}

function drawScaleHandle(
  ctx: CanvasRenderingContext2D,
  point: FacePoint,
  width: number,
  height: number,
  color: string,
  labelColor: string,
  label: string,
): void {
  const x = point.x * width;
  const y = point.y * height;
  ctx.beginPath();
  ctx.arc(x, y, 9, 0, Math.PI * 2);
  ctx.fillStyle = color;
  ctx.fill();
  ctx.font = "700 10px var(--font-abc-diatype), ui-sans-serif, system-ui";
  ctx.fillStyle = labelColor;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(label, x, y);
}
