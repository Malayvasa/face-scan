import { describe, expect, it } from "vitest";
import { CREDIT_CARD_LONG_EDGE_MM, millimetersPerUnit } from "./object-scale";

describe("millimetersPerUnit", () => {
  it("converts a card-length span into millimeters per image unit", () => {
    expect(
      millimetersPerUnit(
        {
          a: { x: 0, y: 0, z: 0 },
          b: { x: 2, y: 0, z: 0 },
        },
        CREDIT_CARD_LONG_EDGE_MM,
      ),
    ).toBeCloseTo(CREDIT_CARD_LONG_EDGE_MM / 2, 8);
  });
});
