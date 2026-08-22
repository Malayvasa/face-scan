import { describe, expect, it } from "vitest";
import { computeMeasurement } from "./compute-measurement";
import { MEASUREMENT_DEFS } from "./measurement-defs";
import { MEASUREMENT_IDS } from "./measurement-id";
import { measureFace } from "./measure-face";
import { testMarkers } from "./test-markers";

const mmPerUnit = 10;

const markers = testMarkers({
  leftEarTop: { x: 0, y: 0, z: 0 },
  leftEarBottom: { x: 0, y: 2, z: 0 },
  leftEyeOuter: { x: 1, y: 2, z: 0 },
  leftEyeInner: { x: 2, y: 2, z: 0 },
  leftEyeTop: { x: 1.5, y: 1.5, z: 0 },
  leftEyeBottom: { x: 1.5, y: 2.5, z: 0 },
  leftBrowTop: { x: 1.5, y: 1, z: 0 },
  leftBrowBottom: { x: 1.5, y: 1.2, z: 0 },
  leftBrowInner: { x: 2.2, y: 1, z: 0 },
  leftBrowOuter: { x: 0.8, y: 1, z: 0 },
  leftNostril: { x: 2.2, y: 3, z: 0 },
  leftTemple: { x: 0.5, y: 0.8, z: 0 },
  leftGonion: { x: 0.2, y: 3.5, z: 0 },
  hairlineCenter: { x: 3, y: 0, z: 0 },
  hairlineLeft: { x: 1.5, y: 0.1, z: 0 },
  hairlineRight: { x: 4.5, y: 0.1, z: 0 },
  foreheadLeft: { x: 1, y: 0.4, z: 0 },
  foreheadRight: { x: 5, y: 0.4, z: 0 },
  nasion: { x: 3, y: 1.6, z: 0 },
  subnasale: { x: 3, y: 3.2, z: 0 },
  upperLip: { x: 3, y: 3.5, z: 0 },
  lowerLip: { x: 3, y: 3.9, z: 0 },
  leftMouthCorner: { x: 2.4, y: 3.7, z: 0 },
  rightMouthCorner: { x: 3.6, y: 3.7, z: 0 },
  chin: { x: 3, y: 5, z: 0 },
  chinLeft: { x: 2.5, y: 4.8, z: 0 },
  chinRight: { x: 3.5, y: 4.8, z: 0 },
  rightBrowInner: { x: 3.8, y: 1, z: 0 },
  rightBrowOuter: { x: 5.2, y: 1, z: 0 },
  rightBrowTop: { x: 4.5, y: 1, z: 0 },
  rightBrowBottom: { x: 4.5, y: 1.2, z: 0 },
  rightEyeInner: { x: 4, y: 2, z: 0 },
  rightEyeOuter: { x: 5, y: 2, z: 0 },
  rightEyeTop: { x: 4.5, y: 1.5, z: 0 },
  rightEyeBottom: { x: 4.5, y: 2.5, z: 0 },
  rightIrisCenter: { x: 4.5, y: 2, z: 0 },
  leftIrisCenter: { x: 1.5, y: 2, z: 0 },
  rightNostril: { x: 3.8, y: 3, z: 0 },
  rightEarTop: { x: 6, y: 0, z: 0 },
  rightEarBottom: { x: 6, y: 2, z: 0 },
  rightTemple: { x: 5.5, y: 0.8, z: 0 },
  rightGonion: { x: 5.8, y: 3.5, z: 0 },
});

describe("computeMeasurement", () => {
  it("converts a 2-unit ear length through the object scale", () => {
    expect(
      computeMeasurement("leftEarLength", markers, mmPerUnit),
    ).toBeCloseTo(20, 5);
  });

  it("returns a right jaw angle for an L-shaped jaw", () => {
    const square = testMarkers({
      rightGonion: { x: 0, y: 0, z: 0 },
      rightEarBottom: { x: 0, y: -1, z: 0 },
      chin: { x: 1, y: 0, z: 0 },
    });
    expect(computeMeasurement("rightJawAngle", square, mmPerUnit)).toBeCloseTo(
      90,
      5,
    );
  });
});

describe("measureFace", () => {
  it("returns every requested measurement", () => {
    const results = measureFace(markers, mmPerUnit);
    expect(results.map((item) => item.id)).toEqual([...MEASUREMENT_IDS]);
    expect(results).toHaveLength(MEASUREMENT_DEFS.length);
    expect(results.every((item) => Number.isFinite(item.value))).toBe(true);
  });
});
