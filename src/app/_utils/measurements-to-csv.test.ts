import { describe, expect, it } from "vitest";
import { measurementsToCsv } from "./measurements-to-csv";
import type { FaceMeasurement } from "./measure-face";

const sample: FaceMeasurement = {
  id: "lipWidth",
  label: "Lip width",
  description: "Corners",
  unit: "mm",
  group: "center",
  markers: ["leftMouthCorner", "rightMouthCorner"],
  value: 48.2,
};

describe("measurementsToCsv", () => {
  it("writes a header and one data row", () => {
    const csv = measurementsToCsv([sample]);
    expect(csv.startsWith("Measurement,Value,Unit,Formatted")).toBe(true);
    expect(csv).toContain("Lip width,48.20,mm,48.2 mm");
  });
});
