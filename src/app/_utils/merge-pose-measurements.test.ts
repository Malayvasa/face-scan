import { describe, expect, it } from "vitest";
import { mergePoseMeasurements } from "./merge-pose-measurements";
import type { FaceMeasurement } from "./measure-face";

function stub(id: FaceMeasurement["id"], value: number): FaceMeasurement {
  return {
    id,
    label: id,
    description: id,
    unit: "mm",
    group: "center",
    markers: ["chin"],
    value,
  };
}

describe("mergePoseMeasurements", () => {
  it("keeps left measurements from the left pose and front from the front pose", () => {
    const merged = mergePoseMeasurements({
      left: [stub("leftEarLength", 60)],
      front: [stub("lipWidth", 48), stub("leftEarLength", 1)],
    });
    const ear = merged.find((item) => item.id === "leftEarLength");
    const lips = merged.find((item) => item.id === "lipWidth");
    expect(ear?.value).toBe(60);
    expect(lips?.value).toBe(48);
  });
});
