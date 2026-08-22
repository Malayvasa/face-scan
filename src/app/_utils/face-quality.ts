import { distance2d } from "./distance-2d";
import type { MarkerMap } from "./extract-markers";
import type { ScanPose } from "./scan-pose";

export type FaceQuality = {
  score: number;
  faceFill: number;
  poseFit: number;
  message: string;
};

export function scoreFacePose(
  markers: MarkerMap,
  pose: ScanPose,
): FaceQuality {
  const width = distance2d(markers.leftEarBottom, markers.rightEarBottom);
  const height = distance2d(markers.hairlineCenter, markers.chin);
  const size = (width + height) / 2;
  const faceFill = clamp(1 - Math.abs(size - 0.42) / 0.42, 0, 1);

  const earDepth = markers.rightEarBottom.z - markers.leftEarBottom.z;
  const profile = clamp(Math.abs(earDepth) / 0.08, 0, 1);
  const facingCamera = clamp(1 - profile, 0, 1);
  const leftTowardCamera = earDepth > 0;
  const poseFit = poseFitScore(pose, profile, facingCamera, leftTowardCamera);
  const score = faceFill * 0.35 + poseFit * 0.65;

  return {
    score,
    faceFill,
    poseFit,
    message: poseMessage(pose, score, faceFill, poseFit),
  };
}

function poseFitScore(
  pose: ScanPose,
  profile: number,
  facingCamera: number,
  leftTowardCamera: boolean,
): number {
  if (pose === "front") return facingCamera;
  if (pose === "left") return leftTowardCamera ? profile : 0;
  return leftTowardCamera ? 0 : profile;
}

function poseMessage(
  pose: ScanPose,
  score: number,
  faceFill: number,
  poseFit: number,
): string {
  if (score >= 0.8) return "Nice — hold still and save this angle.";
  if (faceFill < 0.45) return "Move a little closer so your face fills the oval.";
  if (poseFit < 0.5 && pose === "front") {
    return "Look straight at the camera.";
  }
  if (poseFit < 0.5 && pose === "left") {
    return "Turn until your left ear faces the camera.";
  }
  if (poseFit < 0.5) return "Turn until your right ear faces the camera.";
  return "Hold the card still next to your face.";
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}
