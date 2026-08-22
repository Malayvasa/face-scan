import { describe, expect, it } from "vitest";
import { formatMeasurement } from "./format-measurement";

describe("formatMeasurement", () => {
  it("formats millimeters and degrees", () => {
    expect(formatMeasurement(12.34, "mm")).toBe("12.3 mm");
    expect(formatMeasurement(118.76, "deg")).toBe("118.8°");
  });
});
