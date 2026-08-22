export const SCAN_POSES = ["left", "front", "right"] as const;

export type ScanPose = (typeof SCAN_POSES)[number];

export function poseLabel(pose: ScanPose): string {
  switch (pose) {
    case "left":
      return "Left side";
    case "front":
      return "Front";
    case "right":
      return "Right side";
  }
}

export function poseHint(pose: ScanPose): string {
  switch (pose) {
    case "left":
      return "Turn so the camera sees your left ear and left cheek. Keep the card in the picture.";
    case "front":
      return "Look straight at the camera. Keep the card next to your face.";
    case "right":
      return "Turn so the camera sees your right ear and right cheek. Keep the card in the picture.";
  }
}

export function nextPose(pose: ScanPose): ScanPose | null {
  if (pose === "left") return "front";
  if (pose === "front") return "right";
  return null;
}
