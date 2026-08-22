import { describe, expect, it } from "vitest";
import { distance3d } from "./distance-3d";

describe("distance3d", () => {
  it("computes a 3-4-5 distance", () => {
    expect(
      distance3d({ x: 0, y: 0, z: 0 }, { x: 3, y: 4, z: 0 }),
    ).toBeCloseTo(5, 8);
  });
});
