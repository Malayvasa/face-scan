import type { MeasurementId } from "./measurement-id";
import type { ScanPose } from "./scan-pose";

export function poseForMeasurement(id: MeasurementId): ScanPose {
  switch (id) {
    case "leftEarLength":
    case "leftForeheadAngle":
    case "leftJawAngle":
    case "leftEarToEye":
    case "leftNostrilToEar":
      return "left";
    case "rightNostrilToEar":
    case "rightEarToEye":
    case "rightJawAngle":
    case "rightForeheadAngle":
    case "rightEarLength":
      return "right";
    default:
      return "front";
  }
}
