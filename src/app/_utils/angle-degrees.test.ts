import { describe, expect, it } from "vitest";
import { angleDegrees } from "./angle-degrees";

describe("angleDegrees", () => {
  it("measures a right angle", () => {
    expect(
      angleDegrees(
        { x: 0, y: 0, z: 0 },
        { x: 1, y: 0, z: 0 },
        { x: 0, y: 1, z: 0 },
      ),
    ).toBeCloseTo(90, 5);
  });

  it("measures a straight line as 180 degrees", () => {
    expect(
      angleDegrees(
        { x: 0, y: 0, z: 0 },
        { x: -1, y: 0, z: 0 },
        { x: 1, y: 0, z: 0 },
      ),
    ).toBeCloseTo(180, 5);
  });
});
