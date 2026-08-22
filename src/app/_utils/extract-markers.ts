import type { FacePoint } from "./face-point";
import { LANDMARK } from "./landmark-index";
import type { MarkerId } from "./marker-id";
import { midpoint } from "./midpoint";
import { readLandmark } from "./read-landmark";

export type MarkerMap = Record<MarkerId, FacePoint>;

export function extractMarkers(landmarks: readonly FacePoint[]): MarkerMap {
  const leftEyeInner = readLandmark(landmarks, LANDMARK.leftEyeInner);
  const leftEyeOuter = readLandmark(landmarks, LANDMARK.leftEyeOuter);
  const leftEyeTop = readLandmark(landmarks, LANDMARK.leftEyeTop);
  const leftEyeBottom = readLandmark(landmarks, LANDMARK.leftEyeBottom);
  const rightEyeInner = readLandmark(landmarks, LANDMARK.rightEyeInner);
  const rightEyeOuter = readLandmark(landmarks, LANDMARK.rightEyeOuter);
  const rightEyeTop = readLandmark(landmarks, LANDMARK.rightEyeTop);
  const rightEyeBottom = readLandmark(landmarks, LANDMARK.rightEyeBottom);
  const leftEyeCenter = midpoint(leftEyeInner, leftEyeOuter);
  const rightEyeCenter = midpoint(rightEyeInner, rightEyeOuter);
  const hasIris = landmarks.length >= 478;

  return {
    leftEarTop: readLandmark(landmarks, LANDMARK.leftEarTop),
    leftEarBottom: readLandmark(landmarks, LANDMARK.leftEarBottom),
    rightEarTop: readLandmark(landmarks, LANDMARK.rightEarTop),
    rightEarBottom: readLandmark(landmarks, LANDMARK.rightEarBottom),
    leftTemple: readLandmark(landmarks, LANDMARK.leftTemple),
    rightTemple: readLandmark(landmarks, LANDMARK.rightTemple),
    leftGonion: readLandmark(landmarks, LANDMARK.leftGonion),
    rightGonion: readLandmark(landmarks, LANDMARK.rightGonion),
    chin: readLandmark(landmarks, LANDMARK.chin),
    chinLeft: readLandmark(landmarks, LANDMARK.chinLeft),
    chinRight: readLandmark(landmarks, LANDMARK.chinRight),
    leftEyeInner,
    leftEyeOuter,
    leftEyeTop,
    leftEyeBottom,
    rightEyeInner,
    rightEyeOuter,
    rightEyeTop,
    rightEyeBottom,
    leftIrisCenter: hasIris
      ? readLandmark(landmarks, LANDMARK.leftIrisCenter)
      : leftEyeCenter,
    rightIrisCenter: hasIris
      ? readLandmark(landmarks, LANDMARK.rightIrisCenter)
      : rightEyeCenter,
    leftIrisA: hasIris
      ? readLandmark(landmarks, LANDMARK.leftIrisA)
      : leftEyeInner,
    leftIrisB: hasIris
      ? readLandmark(landmarks, LANDMARK.leftIrisB)
      : leftEyeTop,
    leftIrisC: hasIris
      ? readLandmark(landmarks, LANDMARK.leftIrisC)
      : leftEyeOuter,
    leftIrisD: hasIris
      ? readLandmark(landmarks, LANDMARK.leftIrisD)
      : leftEyeBottom,
    rightIrisA: hasIris
      ? readLandmark(landmarks, LANDMARK.rightIrisA)
      : rightEyeInner,
    rightIrisB: hasIris
      ? readLandmark(landmarks, LANDMARK.rightIrisB)
      : rightEyeTop,
    rightIrisC: hasIris
      ? readLandmark(landmarks, LANDMARK.rightIrisC)
      : rightEyeOuter,
    rightIrisD: hasIris
      ? readLandmark(landmarks, LANDMARK.rightIrisD)
      : rightEyeBottom,
    leftNostril: readLandmark(landmarks, LANDMARK.leftNostril),
    rightNostril: readLandmark(landmarks, LANDMARK.rightNostril),
    nasion: readLandmark(landmarks, LANDMARK.nasion),
    noseTip: readLandmark(landmarks, LANDMARK.noseTip),
    subnasale: readLandmark(landmarks, LANDMARK.subnasale),
    leftBrowInner: readLandmark(landmarks, LANDMARK.leftBrowInner),
    leftBrowOuter: readLandmark(landmarks, LANDMARK.leftBrowOuter),
    leftBrowTop: readLandmark(landmarks, LANDMARK.leftBrowTop),
    leftBrowBottom: readLandmark(landmarks, LANDMARK.leftBrowBottom),
    rightBrowInner: readLandmark(landmarks, LANDMARK.rightBrowInner),
    rightBrowOuter: readLandmark(landmarks, LANDMARK.rightBrowOuter),
    rightBrowTop: readLandmark(landmarks, LANDMARK.rightBrowTop),
    rightBrowBottom: readLandmark(landmarks, LANDMARK.rightBrowBottom),
    hairlineCenter: readLandmark(landmarks, LANDMARK.foreheadTop),
    hairlineLeft: readLandmark(landmarks, LANDMARK.foreheadLeft),
    hairlineRight: readLandmark(landmarks, LANDMARK.foreheadRight),
    leftMouthCorner: readLandmark(landmarks, LANDMARK.leftMouthCorner),
    rightMouthCorner: readLandmark(landmarks, LANDMARK.rightMouthCorner),
    upperLip: readLandmark(landmarks, LANDMARK.upperLip),
    lowerLip: readLandmark(landmarks, LANDMARK.lowerLip),
    foreheadLeft: readLandmark(landmarks, LANDMARK.foreheadLeft),
    foreheadRight: readLandmark(landmarks, LANDMARK.foreheadRight),
  };
}
