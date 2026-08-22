import { angleDegrees } from "./angle-degrees";
import { distance3d } from "./distance-3d";
import type { MarkerMap } from "./extract-markers";
import { foreheadSagitta } from "./forehead-curvature";
import type { MeasurementId } from "./measurement-id";
import { midpoint } from "./midpoint";

export function computeMeasurement(
  id: MeasurementId,
  markers: MarkerMap,
  mmPerUnit: number,
): number {
  switch (id) {
    case "leftEarLength":
      return mm(distance3d(markers.leftEarTop, markers.leftEarBottom), mmPerUnit);
    case "leftForeheadAngle":
      return angleDegrees(
        markers.leftTemple,
        markers.hairlineCenter,
        markers.leftBrowOuter,
      );
    case "leftJawAngle":
      return angleDegrees(
        markers.leftGonion,
        markers.leftEarBottom,
        markers.chin,
      );
    case "leftEarToEye":
      return mm(distance3d(markers.leftEarBottom, markers.leftEyeOuter), mmPerUnit);
    case "leftNostrilToEar":
      return mm(distance3d(markers.leftNostril, markers.leftEarBottom), mmPerUnit);
    case "leftEyeHeight":
      return mm(distance3d(markers.leftEyeTop, markers.leftEyeBottom), mmPerUnit);
    case "leftEyeWidth":
      return mm(distance3d(markers.leftEyeInner, markers.leftEyeOuter), mmPerUnit);
    case "leftEyeToEyebrow":
      return mm(distance3d(markers.leftEyeTop, markers.leftBrowTop), mmPerUnit);
    case "leftEyebrowWidth":
      return mm(distance3d(markers.leftBrowTop, markers.leftBrowBottom), mmPerUnit);
    case "leftEyebrowLength":
      return mm(distance3d(markers.leftBrowInner, markers.leftBrowOuter), mmPerUnit);
    case "leftEyebrowToHairline":
      return mm(distance3d(markers.leftBrowTop, markers.hairlineLeft), mmPerUnit);
    case "distanceBetweenEyebrows":
      return mm(
        distance3d(markers.leftBrowInner, markers.rightBrowInner),
        mmPerUnit,
      );
    case "distanceBetweenEyes":
      return mm(
        distance3d(markers.leftIrisCenter, markers.rightIrisCenter),
        mmPerUnit,
      );
    case "browMidpointToHairline":
      return mm(
        distance3d(
          midpoint(markers.leftBrowInner, markers.rightBrowInner),
          markers.hairlineCenter,
        ),
        mmPerUnit,
      );
    case "foreheadCurvature":
      return mm(
        foreheadSagitta(
          markers.foreheadLeft,
          markers.hairlineCenter,
          markers.foreheadRight,
        ),
        mmPerUnit,
      );
    case "noseLength":
      return mm(distance3d(markers.nasion, markers.subnasale), mmPerUnit);
    case "noseToLip":
      return mm(distance3d(markers.subnasale, markers.upperLip), mmPerUnit);
    case "lipLength":
      return mm(distance3d(markers.upperLip, markers.lowerLip), mmPerUnit);
    case "lipWidth":
      return mm(
        distance3d(markers.leftMouthCorner, markers.rightMouthCorner),
        mmPerUnit,
      );
    case "lipToChin":
      return mm(distance3d(markers.lowerLip, markers.chin), mmPerUnit);
    case "chinWidth":
      return mm(distance3d(markers.chinLeft, markers.chinRight), mmPerUnit);
    case "rightEyebrowToHairline":
      return mm(
        distance3d(markers.rightBrowTop, markers.hairlineRight),
        mmPerUnit,
      );
    case "rightEyebrowLength":
      return mm(
        distance3d(markers.rightBrowInner, markers.rightBrowOuter),
        mmPerUnit,
      );
    case "rightEyebrowWidth":
      return mm(
        distance3d(markers.rightBrowTop, markers.rightBrowBottom),
        mmPerUnit,
      );
    case "rightEyeToEyebrow":
      return mm(distance3d(markers.rightEyeTop, markers.rightBrowTop), mmPerUnit);
    case "rightEyeWidth":
      return mm(
        distance3d(markers.rightEyeInner, markers.rightEyeOuter),
        mmPerUnit,
      );
    case "rightEyeHeight":
      return mm(distance3d(markers.rightEyeTop, markers.rightEyeBottom), mmPerUnit);
    case "rightNostrilToEar":
      return mm(
        distance3d(markers.rightNostril, markers.rightEarBottom),
        mmPerUnit,
      );
    case "rightEarToEye":
      return mm(
        distance3d(markers.rightEarBottom, markers.rightEyeOuter),
        mmPerUnit,
      );
    case "rightJawAngle":
      return angleDegrees(
        markers.rightGonion,
        markers.rightEarBottom,
        markers.chin,
      );
    case "rightForeheadAngle":
      return angleDegrees(
        markers.rightTemple,
        markers.hairlineCenter,
        markers.rightBrowOuter,
      );
    case "rightEarLength":
      return mm(
        distance3d(markers.rightEarTop, markers.rightEarBottom),
        mmPerUnit,
      );
  }
}

function mm(units: number, mmPerUnit: number): number {
  return units * mmPerUnit;
}
