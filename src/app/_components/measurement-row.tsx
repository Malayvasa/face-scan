"use client";

import { Button } from "@/components/button";
import { cn } from "@/lib/cn";
import { formatMeasurement } from "../_utils/format-measurement";
import type { FaceMeasurement } from "../_utils/measure-face";

interface MeasurementRowProps {
  measurement: FaceMeasurement;
  selected: boolean;
  onSelect: (id: FaceMeasurement["id"]) => void;
}

export function MeasurementRow({
  measurement,
  selected,
  onSelect,
}: MeasurementRowProps) {
  return (
    <Button
      type="button"
      variant="ghost"
      onClick={() => onSelect(measurement.id)}
      className={cn(
        "h-auto w-full justify-between gap-4 rounded-lg px-3 py-2.5 text-left whitespace-normal",
        selected && "bg-accent",
      )}
    >
      <span className="min-w-0">
        <span className="text-foreground block text-sm font-medium">
          {measurement.label}
        </span>
        {selected ? (
          <span className="text-muted-foreground mt-1 block text-xs leading-relaxed">
            {measurement.description}
          </span>
        ) : null}
      </span>
      <span className="text-foreground shrink-0 font-mono text-sm">
        {formatMeasurement(measurement.value, measurement.unit)}
      </span>
    </Button>
  );
}
