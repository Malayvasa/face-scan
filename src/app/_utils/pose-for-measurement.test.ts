import { describe, expect, it } from "vitest";
import { MEASUREMENT_IDS } from "./measurement-id";
import { poseForMeasurement } from "./pose-for-measurement";

describe("poseForMeasurement", () => {
  it("maps every measurement to a live camera pose", () => {
    const poses = MEASUREMENT_IDS.map(poseForMeasurement);
    expect(poses).toContain("left");
    expect(poses).toContain("front");
    expect(poses).toContain("right");
    expect(poseForMeasurement("leftEarLength")).toBe("left");
    expect(poseForMeasurement("lipWidth")).toBe("front");
    expect(poseForMeasurement("rightJawAngle")).toBe("right");
  });
});
