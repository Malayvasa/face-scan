import { describe, expect, it } from "vitest";
import { foreheadSagitta } from "./forehead-curvature";

describe("foreheadSagitta", () => {
  it("is the height of the hairline above the temple chord", () => {
    expect(
      foreheadSagitta(
        { x: 0, y: 0, z: 0 },
        { x: 1, y: 2, z: 0 },
        { x: 2, y: 0, z: 0 },
      ),
    ).toBeCloseTo(2, 8);
  });
});
