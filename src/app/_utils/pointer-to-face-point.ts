import type { FacePoint } from "./face-point";

export function pointerToFacePoint(
  event: Pick<PointerEvent, "clientX" | "clientY">,
  canvas: HTMLCanvasElement,
  mirrored: boolean,
  existingZ: number,
): FacePoint {
  const rect = canvas.getBoundingClientRect();
  const nx = (event.clientX - rect.left) / Math.max(rect.width, 1);
  const ny = (event.clientY - rect.top) / Math.max(rect.height, 1);
  return {
    x: mirrored ? 1 - nx : nx,
    y: ny,
    z: existingZ,
  };
}
