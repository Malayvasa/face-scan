export const MEASUREMENT_IDS = [
  "leftEarLength",
  "leftForeheadAngle",
  "leftJawAngle",
  "leftEarToEye",
  "leftNostrilToEar",
  "leftEyeHeight",
  "leftEyeWidth",
  "leftEyeToEyebrow",
  "leftEyebrowWidth",
  "leftEyebrowLength",
  "leftEyebrowToHairline",
  "distanceBetweenEyebrows",
  "distanceBetweenEyes",
  "browMidpointToHairline",
  "foreheadCurvature",
  "noseLength",
  "noseToLip",
  "lipLength",
  "lipWidth",
  "lipToChin",
  "chinWidth",
  "rightEyebrowToHairline",
  "rightEyebrowLength",
  "rightEyebrowWidth",
  "rightEyeToEyebrow",
  "rightEyeWidth",
  "rightEyeHeight",
  "rightNostrilToEar",
  "rightEarToEye",
  "rightJawAngle",
  "rightForeheadAngle",
  "rightEarLength",
] as const;

export type MeasurementId = (typeof MEASUREMENT_IDS)[number];

export type MeasurementGroup =
  | "left-profile"
  | "left-eye"
  | "center"
  | "right-eye"
  | "right-profile";

export type MeasurementUnit = "mm" | "deg";
