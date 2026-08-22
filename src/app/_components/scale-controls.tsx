"use client";

import { Minus, Plus } from "lucide-react";
import { Button } from "@/components/button";
import {
  CREDIT_CARD_LONG_EDGE_MM,
  CREDIT_CARD_SHORT_EDGE_MM,
} from "../_utils/object-scale";

interface ScaleControlsProps {
  knownLengthMm: number;
  pointsReady: boolean;
  onChangeLength: (value: number) => void;
  onConfirm: () => void;
}

export function ScaleControls({
  knownLengthMm,
  pointsReady,
  onChangeLength,
  onConfirm,
}: ScaleControlsProps) {
  return (
    <div className="border-border bg-card space-y-3 rounded-xl border p-4">
      <div>
        <p className="text-foreground text-sm font-medium">Physical ruler</p>
        <p className="text-muted-foreground text-xs leading-relaxed">
          Hold the object next to your face. Tap end A, then end B, on the
          live video. Those two points become the ruler.
        </p>
      </div>
      <div className="flex flex-wrap gap-2">
        <Button
          type="button"
          size="sm"
          variant={
            knownLengthMm === CREDIT_CARD_LONG_EDGE_MM ? "secondary" : "outline"
          }
          onClick={() => onChangeLength(CREDIT_CARD_LONG_EDGE_MM)}
        >
          Card long {CREDIT_CARD_LONG_EDGE_MM} mm
        </Button>
        <Button
          type="button"
          size="sm"
          variant={
            knownLengthMm === CREDIT_CARD_SHORT_EDGE_MM ? "secondary" : "outline"
          }
          onClick={() => onChangeLength(CREDIT_CARD_SHORT_EDGE_MM)}
        >
          Card short {CREDIT_CARD_SHORT_EDGE_MM} mm
        </Button>
      </div>
      <div className="flex items-center gap-2">
        <Button
          type="button"
          size="icon-xs"
          variant="outline"
          aria-label="Decrease known length"
          onClick={() => onChangeLength(clampLength(knownLengthMm - 1))}
        >
          <Minus className="size-3" />
        </Button>
        <span className="text-foreground font-mono text-sm">
          {knownLengthMm.toFixed(1)} mm
        </span>
        <Button
          type="button"
          size="icon-xs"
          variant="outline"
          aria-label="Increase known length"
          onClick={() => onChangeLength(clampLength(knownLengthMm + 1))}
        >
          <Plus className="size-3" />
        </Button>
      </div>
      <Button type="button" disabled={!pointsReady} onClick={onConfirm}>
        Ruler is set — start left side
      </Button>
    </div>
  );
}

function clampLength(value: number): number {
  return Math.min(200, Math.max(10, Math.round(value * 10) / 10));
}
